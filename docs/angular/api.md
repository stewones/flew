---
id: api
title: API
description: 'Great resources to get started learning and using Rebased with Angular'
hide_title: true
---

# Angular API

<a name="CacheModule"></a>

## CacheModule
**Kind**: global class  
<a name="new_CacheModule_new"></a>

### new CacheModule()
<p>Cache Module</p>

**Example**  
```js
  import { CacheModule } from '@reative/angular';
  import { CacheModule } from '@rebased/angular';
  //... 
  CacheModule.forRoot({
    dbName: 'kitty',
    dbStore: 'app'
  })
  //...
  ```
  
<a name="RecordsModule"></a>

## RecordsModule
**Kind**: global class  
<a name="new_RecordsModule_new"></a>

### new RecordsModule()
<p>Records Module</p>

**Example**  
```js
  import { RecordsModule } from '@reative/angular';
  //... 
  RecordsModule.forRoot({
    driver: 'parse', // define default data driver
    silent: false, // whether show logs
    timestamp: false // auto save timestamp
    timestampCreated: 'createdAt',
    timestampUpdated: 'updatedAt'
  })
  //...
  ```
  
<a name="FirebaseModule"></a>

## FirebaseModule
**Kind**: global class  
<a name="new_FirebaseModule_new"></a>

### new FirebaseModule()
<p>Firebase Module</p>

**Example**  
```js
  import { FirebaseModule } from '@reative/angular';
  import { FirebaseModule } from '@rebased/angular';
  //... 
  FirebaseModule.forRoot({
    config: FIREBASE_CONFIG, // from firebase console
    persistence: true // firestore setting
  })
  //...
  ```
  
<a name="ParseModule"></a>

## ParseModule
**Kind**: global class  
<a name="new_ParseModule_new"></a>

### new ParseModule()
<p>Parse Module</p>

**Example**  
```js
  import { ParseModule } from '@reative/angular';
  import { ParseModule } from '@rebased/angular';
  //... 
  ParseModule.forRoot({
    serverURL: 'http://parse-endpoint.com',
    appID: 'Parse-APP-ID',
    masterKey: 'Parse-master-key'
  })
  //...
  ```
  
<a name="ReativeState"></a>

## ReativeState
**Kind**: global class  
<a name="new_ReativeState_new"></a>

### new ReativeState()
<p>Reative State</p>

**Example**  
```js
  import { ReativeState } from '@reative/angular';
  import { NgxsModule } from '@ngxs/store';
  import { environment } from '../environments/environment';

  //... 
    NgxsModule.forRoot([ReativeState], {
        developmentMode: !environment.production
    }),
<a name="RebasedModule"></a>

## RebasedModule
**Kind**: global class  
<a name="new_RebasedModule_new"></a>

### new RebasedModule()
<p>Rebased Module</p>

**Example**  
```js
  import { RebasedModule } from '@rebased/angular';
  //... 
  RebasedModule.forRoot({
    driver: 'firestore', // define default data driver
    silent: false, // whether show logs
    timestampEnabled: true // auto save timestamp
    timestampCreated: 'createdAt',
    timestampUpdated: 'updatedAt'
  })
  //...
  ```
  
<a name="StateModule"></a>

## StateModule
**Kind**: global class  
<a name="new_StateModule_new"></a>

### new StateModule()
<p>State Module</p>

**Example**  
```js
  import { StateModule } from '@reative/angular';
  //... 
  StateModule.forRoot()
  //...
  ```
  
  import { RebasedModule } from '@rebased/angular';
  //... 
  RebasedModule.forRoot({
    production: true,
    trace: false,
    reducers: {...},
  })
  //...
  ```
