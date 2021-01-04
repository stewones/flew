---
id: api
title: API
description: 'Great resources to get started learning and using Rebased'
hide_title: true
---

# Core API

<a name="RebasedCore"></a>

## RebasedCore

**Kind**: global class  
**Implements**: <code>RebasedProtocol</code>

- [RebasedCore](#RebasedCore)
  - [.reset()](#RebasedCore+reset) ⇒ [<code>RebasedCore</code>](#RebasedCore)
  - [.get([path])](#RebasedCore+get) ⇒ <code>Observable.&lt;T&gt;</code>
  - [.post([path], [body])](#RebasedCore+post) ⇒ <code>Observable.&lt;T&gt;</code>
  - [.patch([path], [body])](#RebasedCore+patch) ⇒ <code>Observable.&lt;T&gt;</code>
  - [.delete([path], [body])](#RebasedCore+delete) ⇒ <code>Observable.&lt;T&gt;</code>
  - [.find()](#RebasedCore+find) ⇒ <code>Observable.&lt;T&gt;</code>
  - [.findOne()](#RebasedCore+findOne) ⇒ <code>Observable.&lt;T&gt;</code>
  - [.set(data, [options])](#RebasedCore+set) ⇒ <code>Observable.&lt;T&gt;</code>
  - [.update(data)](#RebasedCore+update) ⇒ <code>Observable.&lt;T&gt;</code>
  - [.on()](#RebasedCore+on) ⇒ <code>Observable.&lt;T&gt;</code>
  - [.count()](#RebasedCore+count) ⇒ <code>Observable.&lt;number&gt;</code>
  - [.run()](#RebasedCore+run) ⇒ <code>Observable.&lt;number&gt;</code>
  - [.driver(name)](#RebasedCore+driver) ⇒ [<code>RebasedCore</code>](#RebasedCore)
  - [.http(fn)](#RebasedCore+http) ⇒ [<code>RebasedCore</code>](#RebasedCore)
  - [.network(active)](#RebasedCore+network) ⇒ [<code>RebasedCore</code>](#RebasedCore)
  - [.cache(active)](#RebasedCore+cache) ⇒ [<code>RebasedCore</code>](#RebasedCore)
  - [.state(active)](#RebasedCore+state) ⇒ [<code>RebasedCore</code>](#RebasedCore)
  - [.key(name)](#RebasedCore+key) ⇒ [<code>RebasedCore</code>](#RebasedCore)
  - [.query(by)](#RebasedCore+query) ⇒ [<code>RebasedCore</code>](#RebasedCore)
  - [.where(field, operator, value)](#RebasedCore+where) ⇒ [<code>RebasedCore</code>](#RebasedCore)
  - [.sort(by)](#RebasedCore+sort) ⇒ [<code>RebasedCore</code>](#RebasedCore)
  - [.size(value)](#RebasedCore+size) ⇒ [<code>RebasedCore</code>](#RebasedCore)
  - [.at(value)](#RebasedCore+at) ⇒ [<code>RebasedCore</code>](#RebasedCore)
  - [.after(value)](#RebasedCore+after) ⇒ [<code>RebasedCore</code>](#RebasedCore)
  - [.ref(path)](#RebasedCore+ref) ⇒ [<code>RebasedCore</code>](#RebasedCore)
  - [.doc(value)](#RebasedCore+doc) ⇒ [<code>RebasedCore</code>](#RebasedCore)
  - [.include(fields)](#RebasedCore+include) ⇒ [<code>RebasedCore</code>](#RebasedCore)
  - [.master(active)](#RebasedCore+master) ⇒ [<code>RebasedCore</code>](#RebasedCore)
  - [.token(session)](#RebasedCore+token) ⇒ [<code>RebasedCore</code>](#RebasedCore)
  - [.object(active)](#RebasedCore+object) ⇒ [<code>RebasedCore</code>](#RebasedCore)
  - [.select(value)](#RebasedCore+select) ⇒ [<code>RebasedCore</code>](#RebasedCore)
  - [.near(field, geopoint, geopoint)](#RebasedCore+near) ⇒ [<code>RebasedCore</code>](#RebasedCore)
  - [.withinKilometers(active, geopoint, maxDistance, sorted)](#RebasedCore+withinKilometers) ⇒ [<code>RebasedCore</code>](#RebasedCore)
  - [.withinMiles(active, geopoint, maxDistance, sorted)](#RebasedCore+withinMiles) ⇒ [<code>RebasedCore</code>](#RebasedCore)

<a name="RebasedCore+reset"></a>

### rebasedCore.reset() ⇒ [<code>RebasedCore</code>](#RebasedCore)

<p>Reset the chaining configuration on the fly</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)  
<a name="RebasedCore+get"></a>

### rebasedCore.get([path]) ⇒ <code>Observable.&lt;T&gt;</code>

<p>Get a document</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param  | Type                | Default                               |
| ------ | ------------------- | ------------------------------------- |
| [path] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> |

<a name="RebasedCore+post"></a>

### rebasedCore.post([path], [body]) ⇒ <code>Observable.&lt;T&gt;</code>

<p>Post document</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param  | Type                | Default                               |
| ------ | ------------------- | ------------------------------------- |
| [path] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> |
| [body] | <code>\*</code>     | <code>{}</code>                       |

<a name="RebasedCore+patch"></a>

### rebasedCore.patch([path], [body]) ⇒ <code>Observable.&lt;T&gt;</code>

<p>Patch a document</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param  | Type                | Default                               |
| ------ | ------------------- | ------------------------------------- |
| [path] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> |
| [body] | <code>\*</code>     | <code>{}</code>                       |

<a name="RebasedCore+delete"></a>

### rebasedCore.delete([path], [body]) ⇒ <code>Observable.&lt;T&gt;</code>

<p>Delete a document</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param  | Type                | Default                               |
| ------ | ------------------- | ------------------------------------- |
| [path] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> |
| [body] | <code>\*</code>     |                                       |

<a name="RebasedCore+find"></a>

### rebasedCore.find() ⇒ <code>Observable.&lt;T&gt;</code>

<p>Find documents</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)  
<a name="RebasedCore+findOne"></a>

### rebasedCore.findOne() ⇒ <code>Observable.&lt;T&gt;</code>

<p>Same as find but only one result is returned</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)  
<a name="RebasedCore+set"></a>

### rebasedCore.set(data, [options]) ⇒ <code>Observable.&lt;T&gt;</code>

<p>Create a document</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param     | Type                    |
| --------- | ----------------------- |
| data      | <code>\*</code>         |
| [options] | <code>SetOptions</code> |

<a name="RebasedCore+update"></a>

### rebasedCore.update(data) ⇒ <code>Observable.&lt;T&gt;</code>

<p>Update document</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param | Type            |
| ----- | --------------- |
| data  | <code>\*</code> |

<a name="RebasedCore+on"></a>

### rebasedCore.on() ⇒ <code>Observable.&lt;T&gt;</code>

<p>Get documents in realtime</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)  
<a name="RebasedCore+count"></a>

### rebasedCore.count() ⇒ <code>Observable.&lt;number&gt;</code>

<p>Count documents</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)  
<a name="RebasedCore+run"></a>

### rebasedCore.run() ⇒ <code>Observable.&lt;number&gt;</code>

<p>Run cloud functions</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)  
<a name="RebasedCore+driver"></a>

### rebasedCore.driver(name) ⇒ [<code>RebasedCore</code>](#RebasedCore)

<p>Modify the driver to be used on the fly</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param | Type                             |
| ----- | -------------------------------- |
| name  | <code>RebasedDriverOption</code> |

<a name="RebasedCore+http"></a>

### rebasedCore.http(fn) ⇒ [<code>RebasedCore</code>](#RebasedCore)

<p>Modify http request config on the fly</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param | Type                  |
| ----- | --------------------- |
| fn    | <code>function</code> |

**Example**

```ts
import { fetch } from '@rebased/core';

fetch('kitty', {
  baseURL: 'https://api.thecatapi.com',
  endpoint: '/v1'
})
  .http(config => {
    // modify axios config
    config.headers['Authorization'] = 'Bearer xyz';
  })
  .get('/images/search?size=small&mime_types=gif')
  .subscribe(
    kitty => console.log(kitty),
    err => console.log(err)
  );
```

<a name="RebasedCore+network"></a>

### rebasedCore.network(active) ⇒ [<code>RebasedCore</code>](#RebasedCore)

<p>Choose whether or not to make a network request</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param  | Type                 |
| ------ | -------------------- |
| active | <code>boolean</code> |

<a name="RebasedCore+cache"></a>

### rebasedCore.cache(active) ⇒ [<code>RebasedCore</code>](#RebasedCore)

<p>Choose whether to use cached results</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param  | Type                 |
| ------ | -------------------- |
| active | <code>boolean</code> |

<a name="RebasedCore+state"></a>

### rebasedCore.state(active) ⇒ [<code>RebasedCore</code>](#RebasedCore)

<p>Choose whether to use cached results</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param  | Type                 |
| ------ | -------------------- |
| active | <code>boolean</code> |

<a name="RebasedCore+key"></a>

### rebasedCore.key(name) ⇒ [<code>RebasedCore</code>](#RebasedCore)

<p>Define a custom key to be used as a identifier for the result set</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param | Type                |
| ----- | ------------------- |
| name  | <code>string</code> |

<a name="RebasedCore+query"></a>

### rebasedCore.query(by) ⇒ [<code>RebasedCore</code>](#RebasedCore)

<p>Define a custom query</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param | Type                |
| ----- | ------------------- |
| by    | <code>object</code> |

<a name="RebasedCore+where"></a>

### rebasedCore.where(field, operator, value) ⇒ [<code>RebasedCore</code>](#RebasedCore)

<p>Constraint results</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param    | Type                |
| -------- | ------------------- |
| field    | <code>string</code> |
| operator | <code>string</code> |
| value    | <code>\*</code>     |

<a name="RebasedCore+sort"></a>

### rebasedCore.sort(by) ⇒ [<code>RebasedCore</code>](#RebasedCore)

<p>Sort data</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param | Type                |
| ----- | ------------------- |
| by    | <code>object</code> |

<a name="RebasedCore+size"></a>

### rebasedCore.size(value) ⇒ [<code>RebasedCore</code>](#RebasedCore)

<p>Define the size of results</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param | Type                |
| ----- | ------------------- |
| value | <code>number</code> |

<a name="RebasedCore+at"></a>

### rebasedCore.at(value) ⇒ [<code>RebasedCore</code>](#RebasedCore)

<p>Set an at pointer for the request</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param | Type            |
| ----- | --------------- |
| value | <code>\*</code> |

<a name="RebasedCore+after"></a>

### rebasedCore.after(value) ⇒ [<code>RebasedCore</code>](#RebasedCore)

<p>Set an after pointer for the request</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param | Type            |
| ----- | --------------- |
| value | <code>\*</code> |

<a name="RebasedCore+ref"></a>

### rebasedCore.ref(path) ⇒ [<code>RebasedCore</code>](#RebasedCore)

<p>Define a document path for a request</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param | Type                |
| ----- | ------------------- |
| path  | <code>string</code> |

<a name="RebasedCore+doc"></a>

### rebasedCore.doc(value) ⇒ [<code>RebasedCore</code>](#RebasedCore)

<p>Define a document id for the request</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param | Type            |
| ----- | --------------- |
| value | <code>\*</code> |

<a name="RebasedCore+include"></a>

### rebasedCore.include(fields) ⇒ [<code>RebasedCore</code>](#RebasedCore)

<p>Populate query fields</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param  | Type                              |
| ------ | --------------------------------- |
| fields | <code>Array.&lt;string&gt;</code> |

<a name="RebasedCore+master"></a>

### rebasedCore.master(active) ⇒ [<code>RebasedCore</code>](#RebasedCore)

<p>Set useMasterKey on the request</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param  | Type                 |
| ------ | -------------------- |
| active | <code>boolean</code> |

<a name="RebasedCore+token"></a>

### rebasedCore.token(session) ⇒ [<code>RebasedCore</code>](#RebasedCore)

<p>Set a session token for the request</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param   | Type                |
| ------- | ------------------- |
| session | <code>string</code> |

<a name="RebasedCore+object"></a>

### rebasedCore.object(active) ⇒ [<code>RebasedCore</code>](#RebasedCore)

<p>Result as real objects</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param  | Type                 |
| ------ | -------------------- |
| active | <code>boolean</code> |

<a name="RebasedCore+select"></a>

### rebasedCore.select(value) ⇒ [<code>RebasedCore</code>](#RebasedCore)

<p>Select custom fields</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param | Type                              |
| ----- | --------------------------------- |
| value | <code>Array.&lt;string&gt;</code> |

<a name="RebasedCore+near"></a>

### rebasedCore.near(field, geopoint, geopoint) ⇒ [<code>RebasedCore</code>](#RebasedCore)

<p>Near geo query</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param    | Type                               |
| -------- | ---------------------------------- |
| field    | <code>string</code>                |
| geopoint | <code>Parse.GeoPoint</code>        |
| geopoint | <code>ParseOptions.GeoPoint</code> |

**Example**

```js
fetch('locations')
  .near('locationField', geopoint(40.0, -30.0))
  .find();
```

<a name="RebasedCore+withinKilometers"></a>

### rebasedCore.withinKilometers(active, geopoint, maxDistance, sorted) ⇒ [<code>RebasedCore</code>](#RebasedCore)

<p>Within Kilometers</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param       | Type                               |
| ----------- | ---------------------------------- |
| active      | <code>string</code>                |
| geopoint    | <code>ParseOptions.GeoPoint</code> |
| maxDistance | <code>number</code>                |
| sorted      | <code>boolean</code>               |

**Example**

```js
fetch('locations')
  .withinKilometers('locationField', geopoint(40.0, -30.0))
  .find();
```

<a name="RebasedCore+withinMiles"></a>

### rebasedCore.withinMiles(active, geopoint, maxDistance, sorted) ⇒ [<code>RebasedCore</code>](#RebasedCore)

<p>Within Miles</p>

**Kind**: instance method of [<code>RebasedCore</code>](#RebasedCore)

| Param       | Type                               |
| ----------- | ---------------------------------- |
| active      | <code>string</code>                |
| geopoint    | <code>ParseOptions.GeoPoint</code> |
| maxDistance | <code>number</code>                |
| sorted      | <code>boolean</code>               |

**Example**

```js
fetch('locations').withinMiles('locationField', geopoint(40.0, -30.0)).find()
will return a field
```
