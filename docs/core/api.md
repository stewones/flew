<a name="Records"></a>

## Records
**Kind**: global class  
**Implements**: <code>ReativeAPI</code>  

* [Records](#Records)
    * [new Records()](#new_Records_new)
    * [.reset()](#Records+reset) ⇒ [<code>Records</code>](#Records)
    * [.get([path])](#Records+get) ⇒ <code>Observable.&lt;T&gt;</code>
    * [.post([path], [body])](#Records+post) ⇒ <code>Observable.&lt;T&gt;</code>
    * [.patch([path], [body])](#Records+patch) ⇒ <code>Observable.&lt;T&gt;</code>
    * [.delete([path], [body])](#Records+delete) ⇒ <code>Observable.&lt;T&gt;</code>
    * [.find()](#Records+find) ⇒ <code>Observable.&lt;T&gt;</code>
    * [.findOne()](#Records+findOne) ⇒ <code>Observable.&lt;T&gt;</code>
    * [.set(data, [options])](#Records+set) ⇒ <code>Observable.&lt;T&gt;</code>
    * [.update(data)](#Records+update) ⇒ <code>Observable.&lt;T&gt;</code>
    * [.on()](#Records+on) ⇒ <code>Observable.&lt;T&gt;</code>
    * [.driver(name)](#Records+driver) ⇒ [<code>Records</code>](#Records)
    * [.http(fn)](#Records+http) ⇒ [<code>Records</code>](#Records)
    * [.network(active)](#Records+network) ⇒ [<code>Records</code>](#Records)
    * [.save(active)](#Records+save) ⇒ [<code>Records</code>](#Records)
    * [.transform(transformFn)](#Records+transform) ⇒ [<code>Records</code>](#Records)
    * [.ttl(value)](#Records+ttl) ⇒ [<code>Records</code>](#Records)
    * [.cache(active)](#Records+cache) ⇒ [<code>Records</code>](#Records)
    * [.state(active)](#Records+state) ⇒ [<code>Records</code>](#Records)
    * [.key(name)](#Records+key) ⇒ [<code>Records</code>](#Records)
    * [.query(by)](#Records+query) ⇒ [<code>Records</code>](#Records)
    * [.where(field, operator, value)](#Records+where) ⇒ [<code>Records</code>](#Records)
    * [.sort(by)](#Records+sort) ⇒ [<code>Records</code>](#Records)
    * [.size(value)](#Records+size) ⇒ [<code>Records</code>](#Records)
    * [.at(value)](#Records+at) ⇒ [<code>Records</code>](#Records)
    * [.after(value)](#Records+after) ⇒ [<code>Records</code>](#Records)
    * [.ref(path)](#Records+ref) ⇒ [<code>Records</code>](#Records)
    * [.doc(value)](#Records+doc) ⇒ [<code>Records</code>](#Records)
    * [.raw(active)](#Records+raw) ⇒ [<code>Records</code>](#Records)
    * [.include(fields)](#Records+include) ⇒ [<code>Records</code>](#Records)
    * [.diff(fn)](#Records+diff) ⇒ [<code>Records</code>](#Records)
    * [.master(active)](#Records+master) ⇒ [<code>Records</code>](#Records)
    * [.token(session)](#Records+token) ⇒ [<code>Records</code>](#Records)
    * [.object(active)](#Records+object) ⇒ [<code>Records</code>](#Records)

<a name="new_Records_new"></a>

### new Records()
<p>Reative Records</p>

<a name="Records+reset"></a>

### records.reset() ⇒ [<code>Records</code>](#Records)
<p>Reset the chaining configuration on the fly</p>

**Kind**: instance method of [<code>Records</code>](#Records)  
<a name="Records+get"></a>

### records.get([path]) ⇒ <code>Observable.&lt;T&gt;</code>
<p>Get a document</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type | Default |
| --- | --- | --- |
| [path] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | 

<a name="Records+post"></a>

### records.post([path], [body]) ⇒ <code>Observable.&lt;T&gt;</code>
<p>Post document</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type | Default |
| --- | --- | --- |
| [path] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | 
| [body] | <code>\*</code> | <code>{}</code> | 

<a name="Records+patch"></a>

### records.patch([path], [body]) ⇒ <code>Observable.&lt;T&gt;</code>
<p>Patch a document</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type | Default |
| --- | --- | --- |
| [path] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | 
| [body] | <code>\*</code> | <code>{}</code> | 

<a name="Records+delete"></a>

### records.delete([path], [body]) ⇒ <code>Observable.&lt;T&gt;</code>
<p>Delete a document</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type | Default |
| --- | --- | --- |
| [path] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | 
| [body] | <code>\*</code> |  | 

<a name="Records+find"></a>

### records.find() ⇒ <code>Observable.&lt;T&gt;</code>
<p>Find documents</p>

**Kind**: instance method of [<code>Records</code>](#Records)  
<a name="Records+findOne"></a>

### records.findOne() ⇒ <code>Observable.&lt;T&gt;</code>
<p>Same as find but only one result is returned</p>

**Kind**: instance method of [<code>Records</code>](#Records)  
<a name="Records+set"></a>

### records.set(data, [options]) ⇒ <code>Observable.&lt;T&gt;</code>
<p>Create a document</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type |
| --- | --- |
| data | <code>\*</code> | 
| [options] | <code>SetOptions</code> | 

<a name="Records+update"></a>

### records.update(data) ⇒ <code>Observable.&lt;T&gt;</code>
<p>Update document</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type |
| --- | --- |
| data | <code>\*</code> | 

<a name="Records+on"></a>

### records.on() ⇒ <code>Observable.&lt;T&gt;</code>
<p>Get documents in realtime</p>

**Kind**: instance method of [<code>Records</code>](#Records)  
<a name="Records+driver"></a>

### records.driver(name) ⇒ [<code>Records</code>](#Records)
<p>Modify the driver to be used on the fly</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type |
| --- | --- |
| name | <code>ReativeDriverOption</code> | 

<a name="Records+http"></a>

### records.http(fn) ⇒ [<code>Records</code>](#Records)
<p>Modify http request config on the fly</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="Records+network"></a>

### records.network(active) ⇒ [<code>Records</code>](#Records)
<p>Choose whether or not to make a network request</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type |
| --- | --- |
| active | <code>boolean</code> | 

<a name="Records+save"></a>

### records.save(active) ⇒ [<code>Records</code>](#Records)
<p>Choose whether or not to save returned data in cache</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type |
| --- | --- |
| active | <code>boolean</code> | 

<a name="Records+transform"></a>

### records.transform(transformFn) ⇒ [<code>Records</code>](#Records)
<p>Shortcut to modify returned results without a pipe</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type |
| --- | --- |
| transformFn | <code>function</code> | 

<a name="Records+ttl"></a>

### records.ttl(value) ⇒ [<code>Records</code>](#Records)
<p>Define a time to live for cache</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 

<a name="Records+cache"></a>

### records.cache(active) ⇒ [<code>Records</code>](#Records)
<p>Choose whether to use cached results</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type |
| --- | --- |
| active | <code>boolean</code> | 

<a name="Records+state"></a>

### records.state(active) ⇒ [<code>Records</code>](#Records)
<p>Choose whether to use state results</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type |
| --- | --- |
| active | <code>boolean</code> | 

<a name="Records+key"></a>

### records.key(name) ⇒ [<code>Records</code>](#Records)
<p>Define a custom key to be used as a identifier for the result set</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="Records+query"></a>

### records.query(by) ⇒ [<code>Records</code>](#Records)
<p>Define a custom query</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type |
| --- | --- |
| by | <code>object</code> | 

<a name="Records+where"></a>

### records.where(field, operator, value) ⇒ [<code>Records</code>](#Records)
<p>Constraint results</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type |
| --- | --- |
| field | <code>string</code> | 
| operator | <code>string</code> | 
| value | <code>\*</code> | 

<a name="Records+sort"></a>

### records.sort(by) ⇒ [<code>Records</code>](#Records)
<p>Sort data</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type |
| --- | --- |
| by | <code>object</code> | 

<a name="Records+size"></a>

### records.size(value) ⇒ [<code>Records</code>](#Records)
<p>Define the size of results</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 

<a name="Records+at"></a>

### records.at(value) ⇒ [<code>Records</code>](#Records)
<p>Set an at pointer for the request</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type |
| --- | --- |
| value | <code>\*</code> | 

<a name="Records+after"></a>

### records.after(value) ⇒ [<code>Records</code>](#Records)
<p>Set an after pointer for the request</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type |
| --- | --- |
| value | <code>\*</code> | 

<a name="Records+ref"></a>

### records.ref(path) ⇒ [<code>Records</code>](#Records)
<p>Define a document path for a request</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type |
| --- | --- |
| path | <code>string</code> | 

<a name="Records+doc"></a>

### records.doc(value) ⇒ [<code>Records</code>](#Records)
<p>Define a document id for the request</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type |
| --- | --- |
| value | <code>\*</code> | 

<a name="Records+raw"></a>

### records.raw(active) ⇒ [<code>Records</code>](#Records)
<p>Use pure results without any internal transformation</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type |
| --- | --- |
| active | <code>boolean</code> | 

<a name="Records+include"></a>

### records.include(fields) ⇒ [<code>Records</code>](#Records)
<p>Populate query fields</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type |
| --- | --- |
| fields | <code>Array.&lt;string&gt;</code> | 

<a name="Records+diff"></a>

### records.diff(fn) ⇒ [<code>Records</code>](#Records)
<p>Modify internal diff function</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type |
| --- | --- |
| fn | <code>\*</code> | 

<a name="Records+master"></a>

### records.master(active) ⇒ [<code>Records</code>](#Records)
<p>Set useMasterKey on the request</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type |
| --- | --- |
| active | <code>boolean</code> | 

<a name="Records+token"></a>

### records.token(session) ⇒ [<code>Records</code>](#Records)
<p>Set a session token for the request</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type |
| --- | --- |
| session | <code>string</code> | 

<a name="Records+object"></a>

### records.object(active) ⇒ [<code>Records</code>](#Records)
<p>Result as real objects</p>

**Kind**: instance method of [<code>Records</code>](#Records)  

| Param | Type |
| --- | --- |
| active | <code>boolean</code> | 

