# Reactive Record [![Build Status](https://travis-ci.org/ionfire/reactive-record.svg?branch=master)](https://travis-ci.org/ionfire/reactive-record) [![codecov](https://codecov.io/gh/ionfire/reactive-record/branch/master/graph/badge.svg)](https://codecov.io/gh/ionfire/reactive-record) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

🍭 It has never been easier to work with cross-platform data using firebase, firestore, http and elasticsearch.

## Guide

- [Install library](https://github.com/ionfire/reactive-record#install-lib)
- [Install dependencies](https://github.com/ionfire/reactive-record#install-dependencies)
- [Angular setup](https://github.com/ionfire/reactive-record#angular-setup)
- [Basic usage for firebase/firestore](https://github.com/ionfire/reactive-record#basic-usage-for-firebasefirestore)
- [Reactive Record Options](https://github.com/ionfire/reactive-record#reactive-record-options)
- [Client Setup Options](https://github.com/ionfire/reactive-record#client-setup-options)
- [Advanced usage](https://github.com/ionfire/reactive-record#advanced-usage)
- [Node.js usage](https://github.com/ionfire/reactive-record#nodejs-usage)

## Requirements
- axios
- lodash
- moment
- rxjs

## Install lib

```sh
npm install --save @ionfire/reactive-record
```

## Install dependencies

```sh
npm i -P axios && npm i -P lodash && npm i -P moment && npm i -P rxjs && npm i -P rxjs-compat
```

## Angular Setup

Go to firebase console > Authentication > Web Setup and then copy and paste the config object into each angular environment at `src/environments`

it should look like this

```ts
export const environment = {
  production: false,
  firebase: {
    apiKey: "xxx",
    authDomain: "yyy.firebaseapp.com",
    databaseURL: "https://yyy.firebaseio.com",
    projectId: "yyy",
    storageBucket: "yyy.appspot.com",
    messagingSenderId: "zzz"
  }
};

```

### Basic usage for firebase/firestore

#### service

```ts
import * as Firebase from 'firebase/app';
import 'firebase/firestore';
import { environment } from '../../environments/environment';
import { ReactiveRecord, RROptions, FirebaseConnector, FirestoreConnector } from '@ionfire/reactive-record';

export class MyService extends ReactiveRecord {
    constructor() {
        super(<RROptions>{
            collection: 'users',
            connector: {
                firebase: new FirebaseConnector(Firebase, environment.firebase),
                firestore: new FirestoreConnector(Firebase, environment.firebase)
            }
        });
    }
}
```

#### component

```ts
import { RRResponse } from '@ionfire/reactive-record';

@Component({
    selector: 'my-component',
    templateUrl: './my-component.html'
})
export class MyComponent implements OnInit {
    users$: Observable<any[]>;
    constructor(public myService: MyService) { }
    ngOnInit() {
        this.users$ = <any>this.myService.find({ query: { field: 'active', operator: '==', value: true } }, (response: RRResponse) => response.data);
    }
}
```

#### template

```html
<ul>
    <li *ngFor="let user of users$ | async">
        {{user.display_name}}
    </li>
</ul>
```


## Reactive Record Options

option | type | required | default | interface
------ | ---- | --------- | -------- | -------
baseURL | `string` | false | null | [RROptions](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/rr-options.ts)
endpoint | `string` | false | null | [RROptions](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/rr-options.ts)
collection | `string` | false | null | [RROptions](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/rr-options.ts)
driver | `string` | false | firestore | [RROptions](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/rr-options.ts)
timestamp | `boolean` | false | true | [RROptions](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/rr-options.ts)
hook | `object` | false | {} | [RRHook](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/rr-hook.ts)
connector | `object` | false | {} | [RRConnector](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/rr-connector.ts)


## Advanced Usage

Provide cache strategy out of box with `ClientSetup`

```ts
import * as Firebase from 'firebase/app';
import 'firebase/firestore';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { ClientSetup, ReactiveRecord } from '@ionfire/reactive-record';

export class MyService extends ReactiveRecord {
    constructor(public storage: Storage) {
        super(new ClientSetup({
            collection: 'my-collection',   
            storage: storage,                // storage adapter
            firebase: Firebase,              // firebase sdk
            config: environment.firebase     // firebase web config
        }));
    }
}
```

## Client Setup Options

Extends [`RROptions`](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/rr-options.ts) plus the following

option | type | required | default | interface
------ | ---- | --------- | -------- | -------
ttl | `number` | false | 0 | [ClientSetupOptions](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/client-setup-options.ts)
firebase | `class` | true | null | ---
config | `object` | true | null | [FirebaseConfig](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/firebase-config.ts)
storage | `object` | true | null | [ClientStorage](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/client-storage.ts)
version | `string` | false | null | [ClientSetupOptions](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/client-setup-options.ts)
token | `object` | false | null | [ClientToken](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/client-token.ts)

## Node.js Usage

Since in server we don't need to cache any data, avoid the usage of `ClientSetup`

```js
const RR = require('@ionfire/reactive-record').RR;
const myService = new RR({ baseURL: 'http://localhost:5000', endpoint: '/' });

// using as promise
myService.get('users').toPromise().then(console.log).catch(console.log);

// using as observable
myService.get('posts').subscribe(console.log, console.log);
```