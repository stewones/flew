---
id: api
title: API
description: 'Great resources to get started learning and using Rebased with Parse Server'
hide_title: true
---

# Parse API

<a name="install"></a>

## install(config, [sdk]) ⇒ <code>Parse</code>
<p>Bootstraps Parse on Rebased</p>

**Kind**: global function  
**Returns**: <code>Parse</code> - <p>Parse instance configured</p>  

| Param | Type | Default |
| --- | --- | --- |
| config | <code>\*</code> |  | 
| [sdk] | <code>\*</code> | <code>Parse</code> | 

<a name="model"></a>

## model(name) ⇒
<p>Extends Parse Object</p>

**Kind**: global function  
**Returns**: <p>Parse.Object</p>  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="object"></a>

## object(from, [attr], [options]) ⇒
<p>Creates a Parse Object</p>

**Kind**: global function  
**Returns**: <p>Parse.Object</p>  

| Param | Type | Default |
| --- | --- | --- |
| from | <code>string</code> |  | 
| [attr] | <code>\*</code> | <code>{}</code> | 
| [options] | <code>\*</code> | <code>{}</code> | 

<a name="parse"></a>

## parse() ⇒
<p>Get the Parse instance</p>

**Kind**: global function  
**Returns**: <p>Parse</p>  
<a name="pointer"></a>

## pointer(name, id) ⇒
<p>Creates a Parse Pointer</p>

**Kind**: global function  
**Returns**: <p>Parse.Object</p>  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| id | <code>string</code> | 

<a name="query"></a>

## query(name) ⇒
<p>Creates a Parse Query</p>

**Kind**: global function  
**Returns**: <p>Parse.Query</p>  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

