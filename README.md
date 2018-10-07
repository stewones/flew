# Reactive Record [![Build Status](https://travis-ci.org/ionfire/reactive-record.svg?branch=master)](https://travis-ci.org/ionfire/reactive-record) [![codecov](https://codecov.io/gh/ionfire/reactive-record/branch/master/graph/badge.svg)](https://codecov.io/gh/ionfire/reactive-record) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

🍭 It has never been easier to work with cross-platform data using firebase, firestore, http and elasticsearch.

## Guide

- [Install library](https://github.com/ionfire/reactive-record#install-lib)
- [Install dependencies](https://github.com/ionfire/reactive-record#install-dependencies)
- [Angular setup](https://github.com/ionfire/reactive-record#angular-setup)
    - [Service](https://github.com/ionfire/reactive-record#service)
    - [Component](https://github.com/ionfire/reactive-record#component)
    - [Template](https://github.com/ionfire/reactive-record#template)
- [Basic usage for firestore](https://github.com/ionfire/reactive-record#basic-usage-for-firebasefirestore)
- [Reactive Record Options](https://github.com/ionfire/reactive-record#reactive-record-options)
- [Client Setup Options](https://github.com/ionfire/reactive-record#client-setup-options)
- [Reactive Record Methods](https://github.com/ionfire/reactive-record#reactive-record-methods)
- [Extra Options](https://github.com/ionfire/reactive-record#extra-options)
- [Advanced usage](https://github.com/ionfire/reactive-record#advanced-usage)
- [Node.js usage](https://github.com/ionfire/reactive-record#nodejs-usage)
- [Dev Setup](https://github.com/ionfire/reactive-record#dev-setup)
    - [Try locally](https://github.com/ionfire/reactive-record#try-locally)
    - [Running tests](https://github.com/ionfire/reactive-record#running-tests)
- [Changelog](https://github.com/ionfire/reactive-record#changelog) 
- [Contributions](https://github.com/ionfire/reactive-record#-contributions) 

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
npm i -P axios && npm i -P lodash && npm i -P moment && npm i -P rxjs
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

#### Service

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

#### Component

```ts
import { RRResponse } from '@ionfire/reactive-record';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Component({
    selector: 'my-component',
    templateUrl: './my-component.html'
})
export class MyComponent implements OnInit {
    users$: Observable<any[]>;
    constructor(public myService: MyService) { }
    ngOnInit() {
        this.users$ = <any>this.myService
                      .find({ query: { field: 'active', operator: '==', value: true } })
                      .pipe(
                        // transform response
                        map((response: RRResponse) => response.data)
                       );
    }
}
```

#### Template

```html
<ul>
    <li *ngFor="let user of users$ | async">
        {{user.display_name}}
    </li>
</ul>
```

## Reactive Record Options

option | type | required | default | interface
------ | ---- | -------- | ------- | ---------
baseURL | `string` | false | null | [RROptions](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/rr-options.ts)
endpoint | `string` | false | null | [RROptions](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/rr-options.ts)
collection | `string` | false | null | [RROptions](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/rr-options.ts)
driver | `string` | false | firestore | [RROptions](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/rr-options.ts)
timestamp | `boolean` | false | true | [RROptions](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/rr-options.ts)
hook | `object` | false | {} | [RRHook](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/rr-hook.ts)
connector | `object` | false | {} | [RRConnector](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/rr-connector.ts)

## Reactive Record Methods

Almost all RR public methods must return a `rxjs` observable. Not all drivers are currently implemented, feel free to submit a PR.

method | params | return | info
------ | ------ | ------ | ----
find | `*request/extraOptions/driver` | [`Observable<RRResponse>`](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/rr-response.ts) | fetch all data
findOne | `*request/extraOptions/driver` | [`Observable<RRResponse>`](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/rr-response.ts) | fetch one data
set | `*id/*data/driver` | any | set data
update | `*id/*data/driver` | any | set data
on | `*request/onSuccess/onError/driver` | `**function` | fetch realtime data
get | `*path/extraOptions` | [`Observable<RRResponse>`](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/rr-response.ts)  | fetch data using http
post | `*path/*body/extraOptions` | [`Observable<RRResponse>`](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/rr-response.ts)  | post data using http
patch | `*path/*body/extraOptions` | [`Observable<RRResponse>`](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/rr-response.ts)  | patch data using http
delete | `*path/extraOptions` | [`Observable<RRResponse>`](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/rr-response.ts)  | post data using http

> `* => required`
> 
> `** => unsubscribe function`

## Extra Options

Almost all of extra options is applied only when using the [ClientSetup](https://github.com/ionfire/reactive-record#advanced-usage) strategy.

option | type | required | default | info
------ | ---- | -------- | ------- | ---------
ttl | `number` | false | `0` | time to live for cache
key | `string` | false | `query|path` | key name for cache
forceCache | `boolean` | false | `false` | force caching 
forceNetwork | `boolean` | false | `false` | force network call
disableHook | `string[]` | false | `[]` | list of hook names to disable 
transformCache | `function` | false | `(data:any)=>data` | transform function for cache

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
            storage: storage,                 // storage adapter
            firebase: Firebase,               // firebase sdk
            config: environment.firebase,     // firebase web config
            ttl: 60*60                        // time to live in seconds
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
storage | `instance` | true | null | [ClientStorage](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/client-storage.ts)
version | `string` | false | null | [ClientSetupOptions](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/client-setup-options.ts)
token | `object` | false | null | [ClientToken](https://github.com/ionfire/reactive-record/blob/master/projects/reactive-record/src/lib/interfaces/client-token.ts)

## Node.js Usage

Since in server we don't need to cache any data, avoid the usage of `ClientSetup`

```js
const ReactiveRecord = require('@ionfire/reactive-record').ReactiveRecord;

const todoService = new ReactiveRecord({ baseURL: 'https://jsonplaceholder.typicode.com', endpoint: '/todos' });

// as promise
todoService.get('/54').toPromise().then(r => console.log(r.data)).catch(console.log);

// as observable
todoService.get('/54').subscribe(r => console.log(r.data), console.log);
```

## Dev Setup

- git clone this repo
- `cd reactive-record`
- npm install
- `npm run build:p` (or `:w` for watch)
- `cd dist/reactive-record`
- `npm link`
  
### Try locally

- cd `your-awesome-app`
- `npm link @ionfire/reactive-record`
- import stuff and do amazing things

### Running tests

- `cd reactive-record`
- `npm run test` (or `test:w` for watch)
- see the `coverage` folder generated

## Changelog

We keep our changes synced with a changelog. [Check it out](https://github.com/ionfire/reactive-record/blob/master/CHANGELOG.md).

## 🤝 Contributions

Contributions, issues and feature requests are always welcome. Please make sure to read the [Contributing Guide](https://github.com/ionfire/reactive-record/blob/master/CONTRIBUTING.md) before making a pull request.