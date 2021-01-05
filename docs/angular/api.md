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
  import { CacheModule } from '@rebased/angular';
  //... 
  CacheModule.forRoot({
    dbName: 'kitty',
    dbStore: 'app'
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
  import { ParseModule } from '@rebased/angular';
  //... 
  ParseModule.forRoot({
    serverURL: 'http://parse-endpoint.com',
    appID: 'Parse-APP-ID',
    masterKey: 'Parse-master-key'
  })
  //...
  ```
  
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
    driver: 'parse', // define default data driver
    silent: false, // whether show logs
    timestamp: false // auto save timestamp
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

