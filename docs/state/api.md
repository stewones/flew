<a name="select"></a>

## select(key, [raw]) ⇒ <code>Observable.&lt;T&gt;</code>
<p>Select data from Reative State</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 
| [raw] | <code>boolean</code> | 

<a name="resetState"></a>

## resetState()
<p>Fully reset current state</p>

**Kind**: global function  
<a name="removeState"></a>

## removeState(key)
<p>Reset a specific state based on key</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 

<a name="getState"></a>

## getState(stateKey, [options]) ⇒ <code>T</code>
<p>Get state synchronously</p>

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| stateKey | <code>string</code> |  | 
| [options] | <code>GetStateOptions</code> | <code>{ raw: false, mutable: false }</code> | 

<a name="getState$"></a>

## getState$(stateKey, [options]) ⇒ <code>Observable.&lt;T&gt;</code>
<p>Get state asynchronously</p>

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| stateKey | <code>string</code> |  | 
| [options] | <code>GetStateOptions</code> | <code>{ raw: false, feed: true }</code> | 

<a name="addState"></a>

## addState(stateKey, value)
<p>Add a new state imperatively</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| stateKey | <code>string</code> | 
| value | <code>\*</code> | 

<a name="setState"></a>

## setState(stateKey, value, [options])
<p>Add a new state dynamically</p>

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| stateKey | <code>string</code> |  | 
| value | <code>\*</code> |  | 
| [options] | <code>SetStateOptions</code> | <code>{ identifier: Reative.options.identifier }</code> | 

<a name="feedState"></a>

## feedState([stateKey])
<p>Transfer state from cache to memory</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| [stateKey] | <code>string</code> | 

<a name="install"></a>

## install(instance)
<p>Initiate state stuff on Reative Platform</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| instance | <code>\*</code> | 

