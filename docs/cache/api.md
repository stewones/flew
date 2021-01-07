---
id: api
title: API
description: 'Great resources to get started learning and using Rebased with Cache'
hide_title: true
---

# Cache API

<a name="Storage"></a>

## Storage
**Kind**: global class  

* [Storage](#Storage)
    * [new Storage()](#new_Storage_new)
    * [.driver](#Storage+driver) ⇒
    * [.ready()](#Storage+ready) ⇒
    * [._getDriverOrder()](#Storage+_getDriverOrder)
    * [.get(key)](#Storage+get) ⇒
    * [.set(key, value)](#Storage+set) ⇒
    * [.remove(key)](#Storage+remove) ⇒
    * [.clear()](#Storage+clear) ⇒
    * [.length()](#Storage+length) ⇒
    * [.keys()](#Storage+keys) ⇒
    * [.forEach(iteratorCallback)](#Storage+forEach) ⇒

<a name="new_Storage_new"></a>

### new Storage()
<p>Storage implementation</p>

<a name="Storage+driver"></a>

### storage.driver ⇒
<p>Get the name of the driver being used.</p>

**Kind**: instance property of [<code>Storage</code>](#Storage)  
**Returns**: <p>Name of the driver</p>  
<a name="Storage+ready"></a>

### storage.ready() ⇒
<p>Reflect the readiness of the store.</p>

**Kind**: instance method of [<code>Storage</code>](#Storage)  
**Returns**: <p>Returns a promise that resolves when the store is ready</p>  
<a name="Storage+_getDriverOrder"></a>

### storage.\_getDriverOrder()
**Kind**: instance method of [<code>Storage</code>](#Storage)  
**Hidden**:   
<a name="Storage+get"></a>

### storage.get(key) ⇒
<p>Get the value associated with the given key.</p>

**Kind**: instance method of [<code>Storage</code>](#Storage)  
**Returns**: <p>Returns a promise with the value of the given key</p>  

| Param | Description |
| --- | --- |
| key | <p>the key to identify this value</p> |

<a name="Storage+set"></a>

### storage.set(key, value) ⇒
<p>Set the value for the given key.</p>

**Kind**: instance method of [<code>Storage</code>](#Storage)  
**Returns**: <p>Returns a promise that resolves when the key and value are set</p>  

| Param | Description |
| --- | --- |
| key | <p>the key to identify this value</p> |
| value | <p>the value for this key</p> |

<a name="Storage+remove"></a>

### storage.remove(key) ⇒
<p>Remove any value associated with this key.</p>

**Kind**: instance method of [<code>Storage</code>](#Storage)  
**Returns**: <p>Returns a promise that resolves when the value is removed</p>  

| Param | Description |
| --- | --- |
| key | <p>the key to identify this value</p> |

<a name="Storage+clear"></a>

### storage.clear() ⇒
<p>Clear the entire key value store. WARNING: HOT!</p>

**Kind**: instance method of [<code>Storage</code>](#Storage)  
**Returns**: <p>Returns a promise that resolves when the store is cleared</p>  
<a name="Storage+length"></a>

### storage.length() ⇒
**Kind**: instance method of [<code>Storage</code>](#Storage)  
**Returns**: <p>Returns a promise that resolves with the number of keys stored.</p>  
<a name="Storage+keys"></a>

### storage.keys() ⇒
**Kind**: instance method of [<code>Storage</code>](#Storage)  
**Returns**: <p>Returns a promise that resolves with the keys in the store.</p>  
<a name="Storage+forEach"></a>

### storage.forEach(iteratorCallback) ⇒
<p>Iterate through each key,value pair.</p>

**Kind**: instance method of [<code>Storage</code>](#Storage)  
**Returns**: <p>Returns a promise that resolves when the iteration has finished.</p>  

| Param | Description |
| --- | --- |
| iteratorCallback | <p>a callback of the form (value, key, iterationNumber)</p> |

<a name="getCache"></a>

## getCache(key) ⇒ <code>\*</code>
<p>Get cache based on some key</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| key | <code>\*</code> | 

**Example**  
```ts
import { getCache } from '@rebased/cache';

const dataKey = 'my-key';
console.log(await getCache('my-key'))
```
<a name="install"></a>

## install(name, store, [driver])
<p>Cache setup</p>

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| name | <code>\*</code> |  | 
| store | <code>\*</code> |  | 
| [driver] | <code>string</code> | <code>&quot;[&#x27;sqlite&#x27;, &#x27;indexeddb&#x27;, &#x27;localstorage&#x27;]&quot;</code> | 

<a name="resetCache"></a>

## resetCache()
<p>Clear cache storage</p>

**Kind**: global function  
<a name="setCache"></a>

## setCache(key, value) ⇒ <code>Void</code>
<p>Programmatically way to set a key based cache</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| key | <code>\*</code> | 
| value | <code>\*</code> | 

<a name="storage"></a>

## storage() ⇒ <code>StorageAdapter</code>
<p>Retrieve the storage instance</p>

**Kind**: global function  
<a name="storageConfig"></a>

## storageConfig([db], [store], [driver]) ⇒ <code>\*</code>
<p>Config helper</p>

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| [db] | <code>string</code> | <code>&quot;&#x27;app:db&#x27;&quot;</code> | 
| [store] | <code>string</code> | <code>&quot;&#x27;app:store&#x27;&quot;</code> | 
| [driver] | <code>string</code> | <code>&quot;[&#x27;sqlite&#x27;, &#x27;indexeddb&#x27;, &#x27;localstorage&#x27;]&quot;</code> | 

