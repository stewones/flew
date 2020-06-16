---
id: api
title: API
description: 'Great resources to get started learning and using Rebased with Parse Server'
hide_title: true
---

# Parse API

<a name="model"></a>

## model(name) ⇒
<p>Extends Parse Object</p>

**Kind**: global function  
**Returns**: <p>Parse.Object</p>  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="query"></a>

## query(name) ⇒
<p>Creates a Parse Query</p>

**Kind**: global function  
**Returns**: <p>Parse.Query</p>  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="pointer"></a>

## pointer(name, id) ⇒
<p>Creates a Parse Pointer</p>

**Kind**: global function  
**Returns**: <p>Parse.Object</p>  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| id | <code>string</code> | 

<a name="geopoint"></a>

## geopoint(lat, lng) ⇒
<p>Creates a Parse Geo Point</p>

**Kind**: global function  
**Returns**: <p>Parse.GeoPoint</p>  

| Param | Type |
| --- | --- |
| lat | <code>number</code> | 
| lng | <code>number</code> | 

**Example**  
```js
// returns Parse.Geopoint(40.0, -30.0)
geopoint(40.0, -30.0)
```
<a name="object"></a>

## object(collection, [attr], [options]) ⇒
<p>Creates a Parse Object</p>

**Kind**: global function  
**Returns**: <p>Parse.Object</p>  

| Param | Type | Default |
| --- | --- | --- |
| collection | <code>string</code> |  | 
| [attr] | <code>\*</code> | <code>{}</code> | 
| [options] | <code>\*</code> | <code>{}</code> | 

<a name="parse"></a>

## parse() ⇒
<p>Get the Parse instance</p>

**Kind**: global function  
**Returns**: <p>Parse</p>  
<a name="install"></a>

## install(sdk, config) ⇒
<p>Bootstraps Parse on Rebased</p>

**Kind**: global function  
**Returns**: <p>RebasedParse</p>  

| Param | Type |
| --- | --- |
| sdk | <code>\*</code> | 
| config | <code>\*</code> | 

