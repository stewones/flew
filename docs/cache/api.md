---
id: api
title: API
description: 'Great resources to get started learning and using Rebased with Cache'
hide_title: true
---

# Cache API

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
<p>Cache install</p>

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| name | <code>\*</code> |  | 
| store | <code>\*</code> |  | 
| [driver] | <code>string</code> | <code>&quot;[&#x27;sqlite&#x27;, &#x27;indexeddb&#x27;, &#x27;localstorage&#x27;]&quot;</code> | 

