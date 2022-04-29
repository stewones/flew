---
title: State Plugin
description: ''
position: 9
category: Guide
---

With [State plugin](https://github.com/intenseloop/flew/tree/master/packages/state/src) you can develop as a hero using redux patterns, also when using this package, all Flew's network calls are sped up by default using results stored in memory.

> The state plugin is suited to work on client side only. It won't work on server.

## Install

```bash
npm install @flew/core @flew/network @flew/state
```

For a better development experience, also make sure to install [Chrome's Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en).

## Configure

```ts
import { setup } from '@flew/core';
import { statePlugin } from '@flew/state';

setup(
  plugins: [
    statePlugin({
      production: false, // so we can use dev tools
      trace: true, // enable trace for dev tools
      traceLimit: 25, // configure trace limit
      reducers: { ... } // list of custom reducers
    }),
  ],
});
```

## Network call

By default the state plugin acts with an internal reducer for network so we can store results in memory speeding up responses even more.

```ts
import { fetch } from '@flew/network';
import { lastValueFrom } from 'rxjs';

// create user
const newUser = await lastValueFrom(
  fetch('User').set({
    name: 'John',
  }),
).then(result => console.log(result));

// Output
// { name: "John", objectId: "a1b2c3" }

// update user
await lastValueFrom(
  fetch('User').doc(newUser.objectId).update({
    name: 'John Doe',
  }),
);

// get user for the very first time (it will be stored in memory)
fetch('User')
  .where('objectId', '==', 'a1b2c3')
  .findOne()
  .subscribe(
    user => console.log(user),
    err => console.log(err),
  );

// Stream outputs 1 result
// { name: "John Doe", objectId: "a1b2c3" }

// Update user again
await lastValueFrom(
  fetch('User').doc(newUser.objectId).update({
    name: 'John Snow',
  }),
);

// get user
fetch('User')
  .where('objectId', '==', 'a1b2c3')
  .findOne()
  .subscribe(
    user => console.log(user),
    err => console.log(err),
  );

// Now stream outputs 2 results in a row
// since we had 1 result stored in memory
// { name: "John Doe", objectId: "a1b2c3" }
// { name: "John Snow", objectId: "a1b2c3" }
```

> Check DevTools to see results stored in the _network_ state

## Disable state in runtime

```ts
fetch('User')
  .where('objectId', '==', 'a1b2c3')
  .state(false) // <- this will disable state for this call
  .findOne()
  .subscribe(
    user => console.log(user),
    err => console.log(err),
  );

// Since state is disabled, the stream will
// always deliver a fresh result from network
// { name: "John Snow", objectId: "a1b2c3" }
```

## Use arbitrary APIs

With Flew's state plugin you don't need to exclusively depend on the internal state behavior. You can also define custom state data.

### Set a custom state

```ts
import { setState, getState } from '@flew/state'

fetch('User')
  .where('objectId', '==', 'a1b2c3')
  .state(false) // <- disable default state behavior
  .findOne()
  .subscribe(
    user => {
        setState('My-Custom-State', {
            myUser: user
        })

        const userFromState = getState('My-Custom-State');

        console.log(userFromState);
        // Output
        // { myUser: { name: "John Snow", objectId: "a1b2c3" }}
        }
    },
    err => console.log(err),
  );
```

Whenever you have the [cachePlugin](/guide/cache-plugin) set up, `setState` will also store in browser's cache by default. You can disable this behavior by passing the `cache` option as third argument.

```ts
setState(
  'My-Custom-State',
  {
    myUser: user,
  },
  {
    cache: false,
  },
);
```

### Clean up stored data

```ts
import { resetState, unsetState } from '@flew/state';

// Resets the whole state store
resetState();

// Clears state by a given key
unsetState('My-Custom-State');
```

## Redux pattern

Flew's state plugin implements the core of Redux principles, so you can create reducers and actions out-of-box with its simplified apis.

### Create reducers

With this example we're going to create a custom `Session` reducer

```ts
import { createReducer } from '@flew/state';

interface Session {
  token: string;
  user: any;
}

const session = createReducer<Session>(
  // initial values
  {
    user: {},
    token: null,
  },
  // reducers
  {
    sessionSetUser: (state, action) => {
        state.user = action.payload;
    },
    sessionSetToken: (state, action) => {
        state.token = action.payload
    },
  },
);

const navigation = createReducer<{
  lastPathname: string;
  currentPathname: string;
}>(
    // initial values
  {
    lastPathname: null,
    currentPathname: null
  },
    // reducers
  {

    navForward: (state, action) => {
      state.lastPathname = state.currentPathname;
      state.currentPathname = action.payload.route;
   },

    navBackward: (state, action) => {
      state.lastPathname = state.currentPathname;
      state.currentPathname = action.payload.route;
    },
  }
);

// enable custom reducers on app startup
import { setup } from '@flew/core';
import { statePlugin } from '@flew/state';

setup(
  plugins: [
    statePlugin({
      // ...
      reducers: { session, navigation }
    }),
  ],
});

```

### Create sync actions

Synchronous actions are actions that receives a flat payload and don't do any async operation.

```ts
import { createAction } from '@flew/state';

const sessionSetToken = createAction<string>('sessionSetToken');
const sessionSetUser = createAction<any>('sessionSetUser');
```

### Create async actions

Asynchronous actions are actions that receives a payload, do some time consuming operation, and then return its `type` and `payload` in order to tell the reducer to modify its state. The example below is a navigation action which takes a route as a parameter and call a network side effect.

```ts
// define the action
function navForward(route: string) {
  return async function (dispatch) {
    const payload = {
      type: 'navForward',
      payload: {
        route,
      },
    };

    await updateSessionOnlineAt(); // side effect

    // tell the linked reducer to change its state
    dispatch(payload);

    // navigate to the given route
    window.location.pathname = route;
  };
}
```

> Note that in this case, the `dispatch` method isn't imported by Flew, but injected as a parameter to the returning function.

### Use actions

The goal of redux actions is to tell the linked reducer to modify its state, in this case we always need to use Flew's `dispatch` method combined with the action in question.

```ts
import { dispatch, getState } from '@flew/state';

// set user's token
dispatch(sessionSetToken('bf1be4e06853'));

// get user's token
const userToken = getState('session.token');

console.log(userToken); // bf1be4e06853

// navigate to users route
dispatch(navForward('/users'));
```

### Reactive state

With the `connect` api you can link a specific piece of state directly into the view since it returns an observable.

Example in Angular

```ts
import { fetch } from '@flew/network';
import { connect } from '@flew/state';

@Component({
  selector: 'my-app',
  template: ` Hello {{ (user$ | async)?.name }} `,
})
export class AppComponent {
  user$ = connect<any>('session.user');

  ngOnInit() {
    fetch('User')
      .where('objectId', '==', 'a1b2c3')
      .findOne()
      .subscribe(user => dispatch(sessionSetUser(user)));
  }
}
```

Example using internal Flew's network state

```ts
import { fetch } from '@flew/network';
import { connect } from '@flew/state';

@Component({
  selector: 'my-app',
  template: ` Hello {{ (user$ | async)?.name }} `,
})
export class AppComponent {
  user$ = connect<User>('myUser', { network: true });

  ngOnInit() {
    fetch('User')
      .key('myUser') // set a custom key to link with
      .where('objectId', '==', 'a1b2c3')
      .findOne();
  }
}
```

Since fetch api always returns an observable, we can also tie it directly to the view.

```ts
import { fetch } from '@flew/network';
import { connect } from '@flew/state';

@Component({
  selector: 'my-app',
  template: ` Hello {{ (user$ | async)?.name }} `,
})
export class AppComponent {
  user$ = fetch('User') //
    .where('objectId', '==', 'a1b2c3') //
    .findOne();
}
```

> Although Flew gives us all those flexibility, we recommend to always be using Redux patterns for easy code debugging and readability.

### Connect context

Since every redux reducer isn't actually mutating its state, the `connect` api also provides a way to easily build features that needs to know what was the previous state.

Example

```ts
import { connect, dispatch } from '@flew/state';

connect('session.user', {
  context: true, // <- Enables state context
}).subscribe(({ prev, next }) => {
  console.log('previous user', prev);
  console.log('next user', next);
});

dispatch(
  sessionSetUser({
    name: 'John Doe',
    objectId: 'a1b2c3',
  }),
);

// output
// previous user {}
// next user  { name: 'John Doe', objectId: 'a1b2c3' }

dispatch(
  sessionSetUser({
    name: 'Daenerys Targaryen',
    objectId: 'e5f6g7',
  }),
);

// output
// previous user { name: 'John Doe', objectId: 'a1b2c3' }
// next user { name: 'Daenerys Targaryen', objectId: 'e5f6g7' }
```
