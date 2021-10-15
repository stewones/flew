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
---
id: api
title: API
description: 'Great resources to get started learning and using Rebased with Parse Server'
hide_title: true
---

# Parse API

<a name="find"></a>

## find(handler)
<p>Parse Find</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| handler | <code>QueryHandler</code> | 

<a name="geopoint"></a>

## geopoint(lat, lng) ⇒ <code>Parse</code>
<p>Apply geopoint on query</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| lat | <code>number</code> | 
| lng | <code>number</code> | 

<a name="install"></a>

## install(config, [sdk]) ⇒ <code>Parse</code>
<p>Bootstraps Parse on Rebased</p>

**Kind**: global function  
**Returns**: <code>Parse</code> - <p>Parse instance configured</p>  

| Param | Type | Default |
| --- | --- | --- |
| config | <code>\*</code> |  | 
| [sdk] | <code>\*</code> | <code>Parse</code> | 

<a name="limit"></a>

## limit(it, connector)
<p>Apply limit on query</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| it | <code>number</code> | 
| connector | <code>\*</code> | 

<a name="model"></a>

## model(name) ⇒ <code>Parse.Object</code>
<p>Extends Parse Object</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| id | <code>string</code> | 

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

## install(sdk, config, [instance]) ⇒
<p>Bootstraps Parse on Reative Platform</p>

**Kind**: global function  
**Returns**: <p>ReativeParse</p>  

| Param | Type | Default |
| --- | --- | --- |
| sdk | <code>\*</code> |  | 
| config | <code>\*</code> |  | 
| [instance] | <code>\*</code> | <code>Reative.Parse</code> | 

<a name="near"></a>

## near(it, connector)
<p>Apply near on query</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| it | <code>NearOptions</code> | 
| connector | <code>\*</code> | 

<a name="object"></a>

## object(from, [attr], [options]) ⇒ <code>Parse.Object</code>
<p>Creates a new Parse Object</p>

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| from | <code>string</code> |  | 
| [attr] | <code>\*</code> | <code>{}</code> | 
| [options] | <code>\*</code> | <code>{}</code> | 

<a name="order"></a>

## order(sort, connector)
<p>Apply order on query</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| sort | <code>\*</code> | 
| connector | <code>\*</code> | 

<a name="parse"></a>

## parse() ⇒ <code>Parse</code>
<p>Retrieve the Parse instance</p>

**Kind**: global function  
<a name="pointer"></a>

## pointer(name, id) ⇒ <code>Parse.Object</code>
<p>Creates a Parse Pointer</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| id | <code>string</code> | 

<a name="query"></a>

## query(name) ⇒ <code>Parse.Query</code>
<p>Creates a Parse Query</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="select"></a>

## select(it, connector)
<p>Apply select on query</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| it | <code>Array.&lt;string&gt;</code> | 
| connector | <code>\*</code> | 

<a name="setWhere"></a>

## setWhere(q, connector)
<p>Set where clause standardized</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| q | <code>\*</code> | 
| connector | <code>\*</code> | 

<a name="skip"></a>

## skip(value, connector)
<p>Apply skip on query</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 
| connector | <code>\*</code> | 

<a name="transpileChainQuery"></a>

## transpileChainQuery(query, handler)
<p>Chain query transpiler</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| query | <code>\*</code> | 
| handler | <code>\*</code> | 

<a name="transpileQueryRouter"></a>

## transpileQueryRouter(specialOperator, chainQuery, handler)
<p>Query router transpiler</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| specialOperator | <code>\*</code> | 
| chainQuery | <code>\*</code> | 
| handler | <code>\*</code> | 

<a name="createQueryByOperator"></a>

## createQueryByOperator(value, operator, handler)
<p>Create query by operator</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | <code>\*</code> | 
| operator | <code>\*</code> | 
| handler | <code>\*</code> | 

<a name="where"></a>

## where([query], connector)
<p>Apply where on query</p>

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| [query] | <code>\*</code> | <code>[]</code> | 
| connector | <code>\*</code> |  | 

<a name="withinQuery"></a>

## withinQuery(it, connector)
<p>Apply withinQuery</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| it | <code>WithInQueryOptions</code> | 
| connector | <code>\*</code> | 

