# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.2.4"></a>
## [1.2.4](https://github.com/ionfire/reactive-record/compare/v1.2.3...v1.2.4) (2018-11-23)
## [0.0.39](https://github.com/rebasedjs/rebasedjs/compare/v0.0.38...v0.0.39) (2021-09-22)


### Bug Fixes

* findOne empty return ([0189861](https://github.com/ionfire/reactive-record/commit/0189861))



<a name="1.2.3"></a>
## [1.2.3](https://github.com/ionfire/reactive-record/compare/v1.2.2...v1.2.3) (2018-11-23)


### Bug Fixes

* where should accept boolean value ([7182831](https://github.com/ionfire/reactive-record/commit/7182831))



<a name="1.2.2"></a>
## [1.2.2](https://github.com/ionfire/reactive-record/compare/v1.2.1...v1.2.2) (2018-11-23)
* revert to lodash for now due to bundle incompatibilities ([6ec1560](https://github.com/rebasedjs/rebasedjs/commit/6ec1560332105d57cc099b42e83fe291262c914e))



## [0.0.38](https://github.com/rebasedjs/rebasedjs/compare/v0.0.37...v0.0.38) (2021-09-22)



## [0.0.37](https://github.com/rebasedjs/rebasedjs/compare/v0.0.36...v0.0.37) (2021-09-15)


### Bug Fixes

* query should accept array as well ([da7b263](https://github.com/ionfire/reactive-record/commit/da7b263))



<a name="1.2.1"></a>
## [1.2.1](https://github.com/ionfire/reactive-record/compare/v1.2.0...v1.2.1) (2018-11-22)


### Features

* add firebase driver ([4162bd2](https://github.com/ionfire/reactive-record/commit/4162bd2))



<a name="1.2.0"></a>

# [1.2.0](https://github.com/ionfire/reactive-record/compare/v1.1.0...v1.2.0) (2018-11-21)

### Deprecation

- improve RR api by removing all unnecessary params like request, extraOptions and driver from methods. Now all the things should be set earlier via chaining. Also ensure that state is being reseted after calls. ([1aefdab](https://github.com/ionfire/reactive-record/commit/1aefdab))

<a name="1.1.0"></a>

# [1.1.0](https://github.com/ionfire/reactive-record/compare/v1.0.3...v1.1.0) (2018-11-20)

### Bug Fixes

- **firestore:** deprecation. now the `on` method receives only two params. the other things is adjusted using the chain ([de50531](https://github.com/ionfire/reactive-record/commit/de50531))

<a name="1.0.3"></a>

## [1.0.3](https://github.com/ionfire/reactive-record/compare/v1.0.2...v1.0.3) (2018-11-17)

### Bug Fixes

- **api:** race conditions ([4c52b5f](https://github.com/ionfire/reactive-record/commit/4c52b5f))

<a name="1.0.2"></a>

## [1.0.2](https://github.com/ionfire/reactive-record/compare/v1.0.1...v1.0.2) (2018-11-17)

### Bug Fixes

- set cache ([1d09a7e](https://github.com/ionfire/reactive-record/commit/1d09a7e))

<a name="1.0.1"></a>

## [1.0.1](https://github.com/ionfire/reactive-record/compare/v1.0.0-beta.3...v1.0.1) (2018-11-15)

### Bug Fixes

- **firestore:** add transformNetwork ([6e38fdf](https://github.com/ionfire/reactive-record/commit/6e38fdf))

### Features

- add saveNetwork and replace forceNetwork and forceCache to useNetwork and useCache instead ([e8c8036](https://github.com/ionfire/reactive-record/commit/e8c8036))
- add saveNetwork and replace forceNetwork and forceCache to useNetwork and useCache instead ([231cd7b](https://github.com/ionfire/reactive-record/commit/231cd7b))

<a name="1.0.0-beta.3"></a>

# [1.0.0-beta.3](https://github.com/ionfire/reactive-record/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2018-11-13)

### Bug Fixes

- improve rr api ([02e8ecb](https://github.com/ionfire/reactive-record/commit/02e8ecb))
- transform response ([e0ca2c7](https://github.com/ionfire/reactive-record/commit/e0ca2c7))

<a name="1.0.0-beta.2"></a>

# [1.0.0-beta.2](https://github.com/ionfire/reactive-record/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2018-11-08)

### Bug Fixes

- code cleaning and refact ClientSetup to RRClientPlugin ([e9c4766](https://github.com/ionfire/reactive-record/commit/e9c4766))
- rename RRClientPlugin to RRCachePlugin as it makes more sense ([6a1e122](https://github.com/ionfire/reactive-record/commit/6a1e122))
- rr find ([263b35c](https://github.com/ionfire/reactive-record/commit/263b35c))

### Features

- add cache plugin strategy ([8b55566](https://github.com/ionfire/reactive-record/commit/8b55566))

<a name="1.0.0-beta.1"></a>

# [1.0.0-beta.1](https://github.com/ionfire/reactive-record/compare/v1.0.0-beta.0...v1.0.0-beta.1) (2018-11-05)

### Features

- add driver abstraction for firestore and a chainable public api for RR ([6e962f2](https://github.com/ionfire/reactive-record/commit/6e962f2))

<a name="0.0.1-alpha.4"></a>

## [0.0.1-alpha.4](https://github.com/ionfire/reactive-record/compare/v0.0.1-alpha.3...v0.0.1-alpha.4) (2018-11-05)

### Features

- add request size ([ee49405](https://github.com/ionfire/reactive-record/commit/ee49405))

<a name="0.0.1-alpha.3"></a>

## [0.0.1-alpha.3](https://github.com/ionfire/reactive-record/compare/v0.0.1-alpha.2...v0.0.1-alpha.3) (2018-10-30)

### Bug Fixes

- performance issue related with cache ([d116506](https://github.com/ionfire/reactive-record/commit/d116506))
- **rr:** remove updated_at from set ([a8804dc](https://github.com/ionfire/reactive-record/commit/a8804dc))

<a name="0.0.1-alpha.2"></a>

## [0.0.1-alpha.2](https://github.com/ionfire/reactive-record/compare/v0.0.1-alpha.1...v0.0.1-alpha.2) (2018-10-12)

### Bug Fixes

- **client:** omit from cache some network response attributes ([382c4a0](https://github.com/ionfire/reactive-record/commit/382c4a0))
- make elastic query more flexible until add a better typing ([df52724](https://github.com/ionfire/reactive-record/commit/df52724))

### Features

- add patch method ([5d440fc](https://github.com/ionfire/reactive-record/commit/5d440fc))

<a name="0.0.1-alpha.1"></a>

## [0.0.1-alpha.1](https://github.com/ionfire/reactive-record/compare/v0.0.1-alpha.0...v0.0.1-alpha.1) (2018-10-10)

### Bug Fixes

- **hook:** response type ([4961315](https://github.com/ionfire/reactive-record/commit/4961315))
- **readme:** add missing links ([f5dda37](https://github.com/ionfire/reactive-record/commit/f5dda37))

### Features

- **readme:** add changelog ([07296eb](https://github.com/ionfire/reactive-record/commit/07296eb))
- **readme:** add methods and more info ([be8be9e](https://github.com/ionfire/reactive-record/commit/be8be9e))

<a name="0.0.1-alpha.0"></a>

## 0.0.1-alpha.0 (2018-10-07)

### Features

- add rr lib 1a773e5
## [5.1.4](https://github.com/stewwan/reative/compare/v5.1.3...v5.1.4) (2020-06-22)


### Bug Fixes

* **core:** events ([870ac01](https://github.com/stewwan/reative/commit/870ac01ee4bb7f738fc37b744c1317017d959bd6))



## [5.1.3](https://github.com/stewwan/reative/compare/v5.1.2...v5.1.3) (2020-06-11)


### Bug Fixes

* **firestore:** remove offline checks and add unsubscription handler ([61a3c20](https://github.com/stewwan/reative/commit/61a3c20db9e55a9efc0658cc5f109495c667adee))



## [5.1.2](https://github.com/stewwan/reative/compare/v5.1.1...v5.1.2) (2020-06-09)


### Bug Fixes

* **browser:** make sure cache won't dispatch if network has been dispatched already ([fbff28a](https://github.com/stewwan/reative/commit/fbff28a45a823d3461ccda0d6982ebcf6c32bf3c))



## [5.1.1](https://github.com/stewwan/reative/compare/v5.1.0...v5.1.1) (2020-05-27)


### Bug Fixes

* **state:** add types for createReducer ([4c426a2](https://github.com/stewwan/reative/commit/4c426a2d4b73cd38f8e4278931e491d4b842d30f))



# [5.1.0](https://github.com/stewwan/reative/compare/v5.0.6...v5.1.0) (2020-05-26)


### Bug Fixes

* **state:** fix getState and improve createAction with types ([2267617](https://github.com/stewwan/reative/commit/2267617b882622645b36f69b46b83c185c69e94f))


### Features

* **state:** add createAction and createReducer helpers ([2c834d1](https://github.com/stewwan/reative/commit/2c834d12df5af2c946cc19a7f13aedbde69c6339))



## [5.0.6](https://github.com/stewwan/reative/compare/v5.0.5...v5.0.6) (2020-05-25)
* **state:** enable custom enhancers ([df066e8](https://github.com/rebasedjs/rebasedjs/commit/df066e8e4c93521af41e7f950f6aab3c23e33bd8))



## [0.0.36](https://github.com/rebasedjs/rebasedjs/compare/v0.0.35...v0.0.36) (2021-09-02)


### Bug Fixes

* add token to bridge interface ([149622a](https://github.com/rebasedjs/rebasedjs/commit/149622ab9964b2175371dd40781ff5367ef6c7dd))



## [0.0.35](https://github.com/rebasedjs/rebasedjs/compare/v0.0.34...v0.0.35) (2021-08-27)


### Bug Fixes

* get rid of lodash in favor of lodash-es ([d7c93ad](https://github.com/rebasedjs/rebasedjs/commit/d7c93adad49c91c34785b0e842d053711ff8c070))



## [0.0.34](https://github.com/rebasedjs/rebasedjs/compare/v0.0.33...v0.0.34) (2021-07-28)


### Bug Fixes

* **parse:** apply size=1 to findOne ([36451c1](https://github.com/rebasedjs/rebasedjs/commit/36451c1734fa8c7d09664164e09e774f15652a3a))
* **parse:** we can't rely on auto id generation for parse ([6a68250](https://github.com/rebasedjs/rebasedjs/commit/6a68250d6683a30e2d84040d6f52531aff8283d0))



## [0.0.33](https://github.com/rebasedjs/rebasedjs/compare/v0.0.32...v0.0.33) (2021-07-22)


### Bug Fixes

* **parse:** delete query payload should use `collection` instead `from` ([03ba955](https://github.com/rebasedjs/rebasedjs/commit/03ba955a9a523f7378e44de9285ecca3c6ebac08))



## [0.0.32](https://github.com/rebasedjs/rebasedjs/compare/v0.0.31...v0.0.32) (2021-07-20)


### Bug Fixes

* **parse:** should pass `collection` to .on method instead of `from` ([3a09506](https://github.com/rebasedjs/rebasedjs/commit/3a09506676df284c4b5c6016e1640905fe4a97b1))



## [0.0.31](https://github.com/rebasedjs/rebasedjs/compare/v0.0.30...v0.0.31) (2021-07-12)


### Features

* **state:** add readonly option to connect ([cc6ca67](https://github.com/rebasedjs/rebasedjs/commit/cc6ca67d6b7711b80fb01385d17600cfa403b68f))



## [0.0.30](https://github.com/rebasedjs/rebasedjs/compare/v0.0.29...v0.0.30) (2021-07-09)


### Features

* add unsetState in favor of removeState and deprecate it ([39fe112](https://github.com/stewwan/reative/commit/39fe112491315594199fa2cbf67c695c12b35a27))



## [5.0.5](https://github.com/stewwan/reative/compare/v5.0.4...v5.0.5) (2020-05-25)
* add not-in operator for parse ([248cff9](https://github.com/rebasedjs/rebasedjs/commit/248cff9e191d3262d499a4af08d00d0e3e50a803))



## [0.0.29](https://github.com/rebasedjs/rebasedjs/compare/v0.0.28...v0.0.29) (2021-06-12)


### Bug Fixes

* **http:** call path ([f7a31d6](https://github.com/stewwan/reative/commit/f7a31d6801fa48253a2dcb50975a1916455256ea))



## [5.0.4](https://github.com/stewwan/reative/compare/v5.0.3...v5.0.4) (2020-05-25)
* **parse:** stop checking isOnline ([58806ee](https://github.com/rebasedjs/rebasedjs/commit/58806ee2384eadd4bb360cd5306ec7f397950c35))



## [0.0.28](https://github.com/rebasedjs/rebasedjs/compare/v0.0.27...v0.0.28) (2021-05-28)


### Bug Fixes

* **select:** options type must be partial ([09029b8](https://github.com/stewwan/reative/commit/09029b87aee656b79e0a55cb53b8319cd05e5327))



## [5.0.3](https://github.com/stewwan/reative/compare/v5.0.2...v5.0.3) (2020-05-23)



## [5.0.2](https://github.com/stewwan/reative/compare/v5.0.1...v5.0.2) (2020-05-23)
* parse .find result ([00f5321](https://github.com/rebasedjs/rebasedjs/commit/00f53210fcd8219168e6f2ab2b37227fe89e5748))



## [0.0.27](https://github.com/rebasedjs/rebasedjs/compare/v0.0.26...v0.0.27) (2021-05-28)


### Bug Fixes

* reative bridge type ([51c901e](https://github.com/stewwan/reative/commit/51c901e078d173b26a9dab2b1d4ce21aa1d206fd))



## [5.0.1](https://github.com/stewwan/reative/compare/v4.0.2...v5.0.1) (2020-05-23)
* parse success response ([8d81fd6](https://github.com/rebasedjs/rebasedjs/commit/8d81fd66c166d95c8a758fb2fa501a989d06d557))



## [0.0.26](https://github.com/rebasedjs/rebasedjs/compare/v0.0.25...v0.0.26) (2021-05-28)


### Bug Fixes

* **find/geo:** this.connector is undefined ([0ba20cf](https://github.com/stewwan/reative/commit/0ba20cf5e19f02135867b4ab00b836454ecae71b))
* **firestore:** declare new chains for geo queries ([7487319](https://github.com/stewwan/reative/commit/748731971071acf969d96d6f860dfc6bc3e08cd7))
* **getState:** typo ([70064e5](https://github.com/stewwan/reative/commit/70064e5cb1a1830647e0ac4c296cf7cd1e992426))
* **parse:**  `run(..)` response ([5731da5](https://github.com/stewwan/reative/commit/5731da5f0eecc1b1af126a919fe012b526ecb143))
* **parse:** `.on()` simultaneous calls ([364a429](https://github.com/stewwan/reative/commit/364a4299cf9768e7c8562dd35ec0b9cb58b0d2ea))
* **parse:** delete should catch errors ([180c069](https://github.com/stewwan/reative/commit/180c06951ee7a94dc369ba6d8d1314359b1b031c))
* **parse:** findOne empty results ([d0fab9a](https://github.com/stewwan/reative/commit/d0fab9a506de5d0c103ee624a2debd01cceee604))
* **platform:** remove server checker for .data ([2e10a73](https://github.com/stewwan/reative/commit/2e10a7373a0a67ecc4549b604e6916109cce6126))
* **state:** applyDevTools ([f2bf5ca](https://github.com/stewwan/reative/commit/f2bf5ca4758db7bfbacef90490a5cd8420bee125))
* setState issue related to cache and publish to reative@5.0.5-next ([6615f0f](https://github.com/stewwan/reative/commit/6615f0f94a6c63cf2461f799b335441fbafd1fc2))


### Features

* **angular:** add configurable StoreModule for the redux approach ([a8e8b6f](https://github.com/stewwan/reative/commit/a8e8b6fad85df3922b4d40d6273508cb7cfaf199))
* **apps:** add parse server ([4b0508a](https://github.com/stewwan/reative/commit/4b0508a836d0640a5e8ee7945227bb7ef28fba2a))
* **cache:** add new apis getCache and setCache ([201282f](https://github.com/stewwan/reative/commit/201282f90459e001ad4da8c63780609c382ec961))
* **geo-queries:** near, withinKilometers, withinMiles ([1c404ec](https://github.com/stewwan/reative/commit/1c404ece7392c52baf765df7640eb29aa4e0fda8))
* **geo/count:** add geo queries to count ([3569d70](https://github.com/stewwan/reative/commit/3569d70f6141ed8177c42e962624206908a66172))
* **geopoint:** method to create a geopoint ([3cc748c](https://github.com/stewwan/reative/commit/3cc748c9004f4b527221d0032fd5425dda98ebfe))
* **redux:** add initial design ([17320d2](https://github.com/stewwan/reative/commit/17320d2cb4f4729100bfeb70e9461698e9b6f068))
* **state:** refact internal state to work in redux flow ([bd49400](https://github.com/stewwan/reative/commit/bd49400bfa9b320b4a44b939eddeb0a2e33551dc))
* **store:** add devtools ([3e6a20f](https://github.com/stewwan/reative/commit/3e6a20fa3186ec672c64f61fbadc8c374685cbd8))
* **todo-redux:** add a route reducer for navigation ([c55f168](https://github.com/stewwan/reative/commit/c55f16835528df58c478d446e6b87b2d806bbd1c))
* **todo-redux:** add all drivers and a way to simulate errors ([295182c](https://github.com/stewwan/reative/commit/295182c3b363899a82f870cf23714534772903d7))
* **todo-redux:** add control reducer ([5cb5e68](https://github.com/stewwan/reative/commit/5cb5e68cbc06cb267d2aa971bcc3df18d18d3338))
* **todo-redux:** add createTodo action ([8fc640d](https://github.com/stewwan/reative/commit/8fc640deb2f06a62d8634c59d8a05ecbbdc01382))
* **todo-redux:** add deleteTodo action ([d537b66](https://github.com/stewwan/reative/commit/d537b6672bc18074b6625df401740ac27db0197f))
* **todo-redux:** add edit action ([2747de4](https://github.com/stewwan/reative/commit/2747de4281fd82f248362a790ec16bc2db0a83a1))
* **todo-redux:** add more actions and a reload button ([ac49d05](https://github.com/stewwan/reative/commit/ac49d0521f87ad69252bad3a276fd2ecd5728780))
* **todo-redux:** add saveTodo action ([8a16ab9](https://github.com/stewwan/reative/commit/8a16ab9b03afa6872103e8b36648266d58fd6455))
* make counter-redux a real redux app ([e8dd1b9](https://github.com/stewwan/reative/commit/e8dd1b93c67baef139eb482abb6d21ec0df8af5d))



## [4.0.2](https://github.com/stewwan/reative/compare/v4.0.1...v4.0.2) (2020-04-29)
* parse response ([b9188b2](https://github.com/rebasedjs/rebasedjs/commit/b9188b24f4dfbc15c6fada58398e01fd2591b657))



## [0.0.25](https://github.com/rebasedjs/rebasedjs/compare/v0.0.24...v0.0.25) (2021-05-28)


### Bug Fixes

* **firebase:** catch firestore connector error ([a44bd71](https://github.com/stewwan/reative/commit/a44bd717d74f0c8da0c733ef246056dbadb86d06))



## [3.0.2](https://github.com/stewwan/reative/compare/v3.0.1...v3.0.2) (2020-02-05)
* **parse:** make .count work as .find ([1727909](https://github.com/rebasedjs/rebasedjs/commit/17279098eb816210f57c140506e422c345d664a7))



## [0.0.24](https://github.com/rebasedjs/rebasedjs/compare/v0.0.23...v0.0.24) (2021-05-27)


### Bug Fixes

* **browser:** should complete observable even if result wasnt ship through network ([9c21fdd](https://github.com/stewwan/reative/commit/9c21fddda68e08e136658c314361c2c940ebd8bf))



## [3.0.1](https://github.com/stewwan/reative/compare/v3.0.0...v3.0.1) (2020-02-05)



# [3.0.0](https://github.com/stewwan/reative/compare/v2.9.11...v3.0.0) (2020-02-05)


### Features

* abstract parse .find and share with worker ([24adc07](https://github.com/stewwan/reative/commit/24adc070c6d105078bce5a896fc54c5575208e40))



## [2.9.11](https://github.com/stewwan/reative/compare/v2.9.10...v2.9.11) (2020-02-04)
* timestampEnabled ([af0fba9](https://github.com/rebasedjs/rebasedjs/commit/af0fba9774c6d1b876575731d7e3b6ac87c667f0))



## [0.0.23](https://github.com/rebasedjs/rebasedjs/compare/v0.0.22...v0.0.23) (2021-03-29)


### Bug Fixes

* worker import from server env ([6aa219b](https://github.com/stewwan/reative/commit/6aa219b9fa0b9489ddfb50376d9755ff2601b66b))


### Features

* **parse:** implement web worker for parse ([19b44c3](https://github.com/stewwan/reative/commit/19b44c3d31d89211bd7154fa6209c052f90b1b46))



## [2.9.10](https://github.com/stewwan/reative/compare/v2.9.9...v2.9.10) (2020-02-04)
* **firestore:** update method should not auto populate the created field ([f8e7cae](https://github.com/rebasedjs/rebasedjs/commit/f8e7cae9f97c9e6d978796ae92c2256ca79d5beb))



## [0.0.22](https://github.com/rebasedjs/rebasedjs/compare/v0.0.21...v0.0.22) (2021-01-11)


### Bug Fixes

* **http:** memoize observables for worker ([d827f0d](https://github.com/stewwan/reative/commit/d827f0d0d147f45f821ab2398a0d6d32f256b5b4))



## [2.9.9](https://github.com/stewwan/reative/compare/v2.9.8...v2.9.9) (2020-02-04)
* browser diff ([b59bdde](https://github.com/rebasedjs/rebasedjs/commit/b59bdded6a93fec1e65bacf74520625d9fa72dde))
* store import to bundle ([abc8982](https://github.com/rebasedjs/rebasedjs/commit/abc8982c44602a5e54c9f5c0d5e6f9a921c4f31a))



## [0.0.21](https://github.com/rebasedjs/rebasedjs/compare/v0.0.20...v0.0.21) (2021-01-06)


### Bug Fixes

* **http:** worker body ([5a00bdc](https://github.com/stewwan/reative/commit/5a00bdcfd290f4c1c80a56255462f8deae2e0a0e))



## [2.9.8](https://github.com/stewwan/reative/compare/v2.9.7...v2.9.8) (2020-02-03)


### Bug Fixes

* **http:** worker headers ([d5c46d8](https://github.com/stewwan/reative/commit/d5c46d8509f79f77638a13de0e754fa76f08e445))



## [2.9.7](https://github.com/stewwan/reative/compare/v2.9.6...v2.9.7) (2020-02-03)


### Bug Fixes

* **http:** improve worker ([b3761c0](https://github.com/stewwan/reative/commit/b3761c0e1190404a7ed19497bb2da4670c93d648))



## [2.9.6](https://github.com/stewwan/reative/compare/v2.9.5...v2.9.6) (2020-02-03)
* angular module default driver init ([19472b8](https://github.com/rebasedjs/rebasedjs/commit/19472b86719dae9bc5427a5da0cba37943db450a))



## [0.0.20](https://github.com/rebasedjs/rebasedjs/compare/v0.0.19...v0.0.20) (2021-01-06)



## [0.0.19](https://github.com/rebasedjs/rebasedjs/compare/v0.0.18...v0.0.19) (2021-01-06)



## [0.0.18](https://github.com/rebasedjs/rebasedjs/compare/v0.0.17...v0.0.18) (2021-01-05)



## [0.0.17](https://github.com/rebasedjs/rebasedjs/compare/v0.0.16...v0.0.17) (2021-01-05)



## [0.0.16](https://github.com/rebasedjs/rebasedjs/compare/v0.0.15...v0.0.16) (2021-01-01)


### Bug Fixes

* **http:** worker implementation. we cant use toPromise() and worker for now ([5ebfc5d](https://github.com/stewwan/reative/commit/5ebfc5de73da64a5eadb2fb82dc083aa032cbe2a))



## [2.9.5](https://github.com/stewwan/reative/compare/v2.9.4...v2.9.5) (2020-02-03)
* **state:** immer produce needs to differentiate objects ([a0cab7a](https://github.com/rebasedjs/rebasedjs/commit/a0cab7a5075f3644d436c46e76afb449df9575ca))



## [0.0.15](https://github.com/rebasedjs/rebasedjs/compare/v0.0.14...v0.0.15) (2020-12-26)


### Bug Fixes

* **http:** needs to complete observable ([a89b1a1](https://github.com/stewwan/reative/commit/a89b1a17ade1337b1e3b53a781554c57a82de79d))



## [2.9.4](https://github.com/stewwan/reative/compare/v2.9.3...v2.9.4) (2020-02-03)
* state produce ([19f22d1](https://github.com/rebasedjs/rebasedjs/commit/19f22d1b1eaac8fbe5c30ea1acfd76c9aad4f21b))



## [0.0.14](https://github.com/rebasedjs/rebasedjs/compare/v0.0.13...v0.0.14) (2020-12-26)


### Bug Fixes

* **http:** response ([3f6a148](https://github.com/stewwan/reative/commit/3f6a14810c8a677015feb955f5c074b396656f40))



## [2.9.3](https://github.com/stewwan/reative/compare/v2.9.2...v2.9.3) (2020-02-03)
* parse install ([3570b44](https://github.com/rebasedjs/rebasedjs/commit/3570b443167d861b99009b833385e1c206e7ac31))



## [0.0.13](https://github.com/rebasedjs/rebasedjs/compare/v0.0.12...v0.0.13) (2020-12-26)


### Bug Fixes

* **http:** worker calls must work from loops and we dont need to construct the worker for every call ([974fa06](https://github.com/stewwan/reative/commit/974fa064224c7d1d8e2ad2d8e99fbb7fe351482e))



## [2.9.2](https://github.com/stewwan/reative/compare/v2.9.1...v2.9.2) (2020-02-03)
* browser diff ([8cd952c](https://github.com/rebasedjs/rebasedjs/commit/8cd952c522bbd7952e3a5698154ed86997376fc0))
* diff logic for non existent results ([31925b2](https://github.com/rebasedjs/rebasedjs/commit/31925b2efd86f129df473665e8125db02889eddd))
* firestore connector ([c2b87d4](https://github.com/rebasedjs/rebasedjs/commit/c2b87d4751b6a5f0fc506ba7b86470a546636568))
* firestore realtime unsubscription ([efa2016](https://github.com/rebasedjs/rebasedjs/commit/efa20169c43c40abfcb7c0d2de78fa5a2b8f54c8))
* installers ([9ac24fe](https://github.com/rebasedjs/rebasedjs/commit/9ac24fea6cd51b8aeed504b4ea6eb3ccf2aff2fd))
* internal unsub ([41b3b42](https://github.com/rebasedjs/rebasedjs/commit/41b3b4277ebd8471c6c890800258f09e248b723c))
* **browser:** check for online state before dispatching results ([8ff0592](https://github.com/rebasedjs/rebasedjs/commit/8ff05923c04f66646dc139dbc955cfef57a931d1))



## [0.0.12](https://github.com/rebasedjs/rebasedjs/compare/v0.0.11...v0.0.12) (2020-12-09)


### Bug Fixes

* **http:** success handler for web worker ([ae7dfd7](https://github.com/stewwan/reative/commit/ae7dfd7c6b0bf614a7b8b1e6f931c6a7c41ac786))



## [2.9.1](https://github.com/stewwan/reative/compare/v2.9.0...v2.9.1) (2020-02-03)


### Bug Fixes

* **http:** must be able to reconfigure http on the fly ([ffd47f8](https://github.com/stewwan/reative/commit/ffd47f8080102b0e955e47ad97423c8d6c8994d8))



# [2.9.0](https://github.com/stewwan/reative/compare/v2.8.0...v2.9.0) (2020-02-03)


### Bug Fixes

* **http:** merge options correctly ([357be36](https://github.com/stewwan/reative/commit/357be3626dff8f9e9be370405391c7db5fefc1d5))


### Features

* **http:** add web worker ([35e30e2](https://github.com/stewwan/reative/commit/35e30e229c10ca23bef7ce67a0d9ed294d0aa28b))



# [2.8.0](https://github.com/stewwan/reative/compare/v2.7.0...v2.8.0) (2020-01-29)


### Bug Fixes

* **firestore:** add missing cursor ([4253f80](https://github.com/stewwan/reative/commit/4253f80186bd6f212d14f79f55653daa799c270a))


### Features

* **parse:** add `run` verb to make it possible execute cloud functions through reative ([cf574d3](https://github.com/stewwan/reative/commit/cf574d33747762f79f7f07c7d551f89a7a894a7b))



# [2.7.0](https://github.com/stewwan/reative/compare/v2.6.2...v2.7.0) (2020-01-23)


### Features

* **parse:** add array support for queries ([1e77bc1](https://github.com/stewwan/reative/commit/1e77bc1818d4ca52feab1a1f853d6b7a00fbc77a))
* **parse:** add array support for queries ([f5745ed](https://github.com/stewwan/reative/commit/f5745ed5a280692b3a798227ba690ce7505bb705))



## [2.6.2](https://github.com/stewwan/reative/compare/v2.6.1...v2.6.2) (2020-01-22)


### Bug Fixes

* **parse:** .set should populate updated_at closes [#18](https://github.com/stewwan/reative/issues/18) ([503f3dd](https://github.com/stewwan/reative/commit/503f3dd30849a929cd1d6a1d610c0d6e1af78b4d))



## [2.6.1](https://github.com/stewwan/reative/compare/v2.6.0...v2.6.1) (2020-01-21)


### Bug Fixes

* **parse:** .on needs to check for special queries ([751d8a1](https://github.com/stewwan/reative/commit/751d8a1913db9e10ec3c4533088a181b21a7f8f8))



# [2.6.0](https://github.com/stewwan/reative/compare/v2.5.2...v2.6.0) (2020-01-20)


### Features

* **parse:** implement .delete verb closes [#21](https://github.com/stewwan/reative/issues/21) ([a57887f](https://github.com/stewwan/reative/commit/a57887f4401bc94499f25ee6502180eef7bd76e2))



## [2.5.2](https://github.com/stewwan/reative/compare/v2.5.1...v2.5.2) (2020-01-16)


### Bug Fixes

* **parse:** needs to check for query existence ([d40cf33](https://github.com/stewwan/reative/commit/d40cf330fcd5d41e14751368aefd0ceb79f6c25b))



## [2.5.1](https://github.com/stewwan/reative/compare/v2.5.0...v2.5.1) (2020-01-16)


### Bug Fixes

* **parse:** include/exclude operators for .query ([84108dd](https://github.com/stewwan/reative/commit/84108ddb53d8268da272c2d335ea8a5f5a8ba47b))



# [2.5.0](https://github.com/stewwan/reative/compare/v2.4.0...v2.5.0) (2020-01-16)


### Bug Fixes

* **parse:** .on also must include fields ([f5b4957](https://github.com/stewwan/reative/commit/f5b4957114f83f5c0e9fa63d6acc5f249540c394))


### Features

* **parse/query:** handle complex and multi level queries ([1932d72](https://github.com/stewwan/reative/commit/1932d72d8757c312edabb6625b93ef6b98ebd892))



# [2.4.0](https://github.com/stewwan/reative/compare/v2.3.2...v2.4.0) (2020-01-03)


### Features

* **parse:** implement `after` ([1366ac6](https://github.com/stewwan/reative/commit/1366ac6c9e94cf38230770fa185aaa124755d177))



## [2.3.2](https://github.com/stewwan/reative/compare/v2.3.1...v2.3.2) (2020-01-03)


### Bug Fixes

* **parse:** needs to skip on default query for the `or` clausule ([6cb4f1f](https://github.com/stewwan/reative/commit/6cb4f1f3dc7d2d00e63a163c8722ebdff94d9ec1))



## [2.3.1](https://github.com/stewwan/reative/compare/v2.3.0...v2.3.1) (2020-01-03)


### Bug Fixes

* **parse:** or clausule ([c2607d1](https://github.com/stewwan/reative/commit/c2607d1dbe7ab6aec949bfbc15c3089cac5e8937))



# [2.3.0](https://github.com/stewwan/reative/compare/v2.2.0...v2.3.0) (2020-01-03)


### Features

* **parse:** add `or` clausule ([baa4a6f](https://github.com/stewwan/reative/commit/baa4a6fc66a5a25b97433006f1694766f8c1d65b))



# [2.2.0](https://github.com/stewwan/reative/compare/v2.1.0...v2.2.0) (2020-01-03)


### Features

* **parse:** add `count()` verb ([7b818a6](https://github.com/stewwan/reative/commit/7b818a66a03af6d2400088e3a8134099b9e2c1a1))
* **parse:** make .query work with arrays ([61f3d80](https://github.com/stewwan/reative/commit/61f3d80160284088e0323be7c93f801eb0e69ef5))



# [2.1.0](https://github.com/stewwan/reative/compare/v2.0.3...v2.1.0) (2019-12-10)


### Bug Fixes

* **angular:** need to export init classes for modules ([34e70d2](https://github.com/stewwan/reative/commit/34e70d2190d8a5ef91a13e955f10174c70069d04))
* **parse:** timestamp and identifier usage ([c6c7b94](https://github.com/stewwan/reative/commit/c6c7b94767150b05a97881f4228922cf781617fe))
* **parse:** user collection must be mapped ([18d7b93](https://github.com/stewwan/reative/commit/18d7b93f60e549d4f859d551d92ae12fe6adeada))


### Features

* **parse:** add `object` method to chaining api ([db7b32f](https://github.com/stewwan/reative/commit/db7b32f5b6fc83c9b0465f85e111fb8585ad6799))
* **parse:** add removeState(key) ([c8a582d](https://github.com/stewwan/reative/commit/c8a582d8177febeb9614bca7ea984c6001ed4755))



## [2.0.3](https://github.com/stewwan/reative/compare/v2.0.0...v2.0.3) (2019-12-04)


### Bug Fixes

* bump firebase ([6e69904](https://github.com/stewwan/reative/commit/6e699040c7a12b5aa3a8dbb859f0a1dd22f4652e))
* stuff to make it work in vue ([6a4992c](https://github.com/stewwan/reative/commit/6a4992cd85d8c7c500d2cada49d69fb23e198a1b))
* **browser:** cache diff ([dae93de](https://github.com/stewwan/reative/commit/dae93de2ad4b4b7a018922dadd3b9a1f6910d9fa))


### Features

* **parse:** add useMasterKey and sessionToken options to the chaining ([29ed50c](https://github.com/stewwan/reative/commit/29ed50ce84dfe1d4e3ebbf89ac12336743f5c778))



## [2.0.2](https://github.com/stewwan/reative/compare/v2.0.0...v2.0.2) (2019-12-03)


### Bug Fixes

* bump firebase ([6e69904](https://github.com/stewwan/reative/commit/6e699040c7a12b5aa3a8dbb859f0a1dd22f4652e))
* stuff to make it work in vue ([6a4992c](https://github.com/stewwan/reative/commit/6a4992cd85d8c7c500d2cada49d69fb23e198a1b))



## [2.0.1](https://github.com/stewwan/reative/compare/v2.0.0...v2.0.1) (2019-12-03)


### Bug Fixes

* stuff to make it work in vue ([6a4992c](https://github.com/stewwan/reative/commit/6a4992cd85d8c7c500d2cada49d69fb23e198a1b))



# [2.0.0](https://github.com/stewwan/reative/compare/v1.7.0...v2.0.0) (2019-12-03)

## Feature Highlight

Organizing packages so we can ship features for another frameworks in the near future.

## Deprecations

- replace `State` by `ReativeState`
- now every angular module should be imported from `@reative/angular`

  ```ts
  import {
    RecordsModule,
    StateModule,
    ParseModule,
    FirebaseModule,
    CacheModule,
    ReativeState
  } from '@reative/angular';
  ```

- now these needs to be imported by client app when needed (recommended to add in client's app.module)

  ```ts
  import 'firebase/storage';
  import 'firebase/firestore';
  import 'firebase/database';
  import 'firebase/auth';
  import 'firebase/app';
  ```

- records package is dead
  - npm uninstall --save @reative/records
  - npm install --save @reative/core
  - replace every `@reative/records` to `@reative/core`

# [1.7.0](https://github.com/stewwan/reative/compare/v1.6.1...v1.7.0) (2019-12-02)

## Warning

To reach higher compatibility among all the drivers you might need to specify the `identifier` field on the module initialisation as its default to `doc_id`

```ts
RecordsModule.forRoot({
  // add whatever you use as a identifier for a record.
  // note that the name `id` cant be used for the parse driver
  // because it's a reserved keyword
  // so use this option carefully
  identifier: 'id'
});
```

### Bug Fixes

- **parse:** must use driverOptions.identifier ([5e96a55](https://github.com/stewwan/reative/commit/5e96a55c12be7d099cb36b526c910e2373f76f3a))
- **parse:** tweak `where` log and remove exception for offline cases ([a088b43](https://github.com/stewwan/reative/commit/a088b435787c07a75ba9f8fe582e200cb52072b7))

### Features

- **parse:** export pure function parse() to expose their api ([df8d385](https://github.com/stewwan/reative/commit/df8d3852f61356f61d8f639a6267945eff3f12fc))
- **state:** implement `addState` to serve as a fast replacement for the use case of `setState` with merge false ([5e460f5](https://github.com/stewwan/reative/commit/5e460f55107232d1044438da24141cc7cd9e6c94))

## [1.6.1](https://github.com/stewwan/reative/compare/v1.6.0...v1.6.1) (2019-11-29)

### Bug Fixes

- **parse:** update verb ([6ff166a](https://github.com/stewwan/reative/commit/6ff166a1a036e3c1c1e0e5e87374be071e069429))

## [1.6.0](https://github.com/stewwan/reative/compare/v1.5.0...v1.6.0) (2019-11-28)

### Features

- **parse:** expose objectId as id in parse results ([e8eb410](https://github.com/stewwan/reative/commit/e8eb410d3641e7ee26c23711131e8c634de65e66))
- **pointer:** add a mapping for the class name ([2f575cc](https://github.com/stewwan/reative/commit/2f575cc13ec3ff45046a754229389f0feac13f83))

### Bug Fixes

- driver chaining ([9b489a8](https://github.com/stewwan/reative/commit/9b489a86db0a35f11072dcc35616e763e5ed4e29))
- **rr:** options needs re-evaluation on each run ([76004e2](https://github.com/stewwan/reative/commit/76004e2be8cb15fc76792154a197ac1dad0f39d1))

### [1.5.2](https://github.com/stewwan/reative/compare/v1.5.1...v1.5.2) (2019-11-26)

### Bug Fixes

- **browser:** add a checker for empty data before saving to cache ([e72a18b](https://github.com/stewwan/reative/commit/e72a18b))
- **browser:** need to reset chain for subsequent calls ([204cd8c](https://github.com/stewwan/reative/commit/204cd8c))
- **reative:** make silent option true as default ([a124c33](https://github.com/stewwan/reative/commit/a124c33))
- **server:** adjust key gen ([9f108e1](https://github.com/stewwan/reative/commit/9f108e1))
- **store:** add a checker for setState to avoid equal states ([f9df265](https://github.com/stewwan/reative/commit/f9df265))

### [1.5.1](https://github.com/stewwan/reative/compare/v1.5.0...v1.5.1) (2019-11-26)

### Bug Fixes

- typo on connector for firebase driver ([4887633](https://github.com/stewwan/reative/commit/4887633))

## [1.5.0](https://github.com/stewwan/reative/compare/v1.4.3...v1.5.0) (2019-11-26)

## Feature Highlight

- rewrite of platforms and drivers
- shipped a pure function `collection` to serve as a spare replacement option for the `@Collection` decorator. Easier for server side usage.

```ts
import { collection } from '@reative/core';

collection('Cat', {
  baseURL: 'https://api.thecatapi.com',
  endpoint: '/v1'
})
  .get('/images/search')
  .subscribe(r => console.log(`a random kitty`, r));
```

- shipped full support for parse

```ts
import { collection } from '@reative/core';
import { pointer } from '@reative/parse';

//
// get user
const user = await collection('_User')
  .driver('parse')
  .findOne()
  .toPromise();

//
// create a task with a relation
await collection('Task')
  .driver('parse')
  .set({
    name: 'Hello World from Parse',
    owner: pointer('_User', user.objectId)
  })
  .toPromise();

//
// get tasks
collection('Task')
  .driver('parse')
  .find()
  .subscribe(tasks => console.log(tasks));
```

## Deprecations

- platforms no longer have `clearCache()`. replace by the pure function `resetCache()` from the `@reative/cache` package
- platforms no longer have `firestore()` and `firebase()`. import them directly from the `@reative/firebase` package
- `useLog` has been removed, use the `silent` option instead
- `.update()` no longer receives an id as first param. use the chain method `.doc` instead

  ```js
  // before
  .update(id, data)

  // after
  .doc(id)
  .update(data)
  ```

- `.set()` no longer receives an id as first param. use the chain method `.doc` instead

  ```js
  // before
  .set(id, data)

  // after
  .doc(id)
  .set(data)
  ```

- `.set()` now receives an object as second param rather than a boolean

  ```js
  // before
  .set(id, data, true)

  // after
  .doc(id)
  .set(data, { merge: true })
  ```

### Bug Fixes

- **browser:** make better use of memory and logs ([7f9608e](https://github.com/stewwan/reative/commit/7f9608e))
- upgrade firebase and remove ionic from cache module ([62edbf6](https://github.com/stewwan/reative/commit/62edbf6))
- **api:** make sure .set and .update work without having id as a param ([2bb7043](https://github.com/stewwan/reative/commit/2bb7043))
- **browser:** catch setState exceptions ([c240fab](https://github.com/stewwan/reative/commit/c240fab))
- **browser:** check for cache service availability ([25b7155](https://github.com/stewwan/reative/commit/25b7155))
- **browser:** check for state existence ([7ae88e1](https://github.com/stewwan/reative/commit/7ae88e1))
- **browser:** dispatch ([3665b6e](https://github.com/stewwan/reative/commit/3665b6e))
- **browser:** improve cache/state logic ([c30e6c0](https://github.com/stewwan/reative/commit/c30e6c0))
- **browser:** inscrease reliability of observables ([f8ddb2b](https://github.com/stewwan/reative/commit/f8ddb2b))
- **browser:** memory leaks ([76cb540](https://github.com/stewwan/reative/commit/76cb540))
- **browser:** replace `super` calls with `this` ([92d469a](https://github.com/stewwan/reative/commit/92d469a))
- **browser:** state sync should listen for saveNetwork attribute ([7806a96](https://github.com/stewwan/reative/commit/7806a96))
- **parse:** make `on` verb work with newer browser strategy ([874d987](https://github.com/stewwan/reative/commit/874d987))
- **rr:** add response type ([1a24d3b](https://github.com/stewwan/reative/commit/1a24d3b))
- **rr:** store and browser support for ttl ([77ecf43](https://github.com/stewwan/reative/commit/77ecf43))
- **schematics:** export page schema ([59a477a](https://github.com/stewwan/reative/commit/59a477a))
- **schematics:** remove unnecessary suffix `-page` from component folder ([0b4130b](https://github.com/stewwan/reative/commit/0b4130b))
- **state:** feedState with key should use the get method rather loop ([16becd2](https://github.com/stewwan/reative/commit/16becd2))
- **store:** value is not iterable ([3835ebc](https://github.com/stewwan/reative/commit/3835ebc))
- **store:** cant import storage from here ([51c18bf](https://github.com/stewwan/reative/commit/51c18bf))
- **store:** grab identifier from global option ([bc7e3e3](https://github.com/stewwan/reative/commit/bc7e3e3))
- **store:** need to return the state from store lol ([d451cbf](https://github.com/stewwan/reative/commit/d451cbf))
- **store:** setState was saving cache twice ([3726f2f](https://github.com/stewwan/reative/commit/3726f2f))
- when observable should be completed for ttl and redundance of diff fn ([25af5dd](https://github.com/stewwan/reative/commit/25af5dd))

### Features

- **firestore:** add `at` and `after` to api ([00b1723](https://github.com/stewwan/reative/commit/00b1723))
- **parse:** add aggregations ([cde7928](https://github.com/stewwan/reative/commit/cde7928))
- **parse:** add support for `.set` and `.update` ([a4e34bc](https://github.com/stewwan/reative/commit/a4e34bc))
- **rr:** add pub/sub api ([2716b9b](https://github.com/stewwan/reative/commit/2716b9b))
- **rr:** export diff function ([d520fa2](https://github.com/stewwan/reative/commit/d520fa2))
- **schematics:** add page ([92234a9](https://github.com/stewwan/reative/commit/92234a9))
- **state:** make feedState also accept a key ([246e5fb](https://github.com/stewwan/reative/commit/246e5fb))
- **state:** make getState also return from cache if needed ([1009945](https://github.com/stewwan/reative/commit/1009945))
- add pointer for parse, make .set and .update api stable and improve global options ([f56ae7a](https://github.com/stewwan/reative/commit/f56ae7a))
- refactor platforms and drivers and remove deprecations ([a370cdc](https://github.com/stewwan/reative/commit/a370cdc))
- **store:** add mutable option to getState ([3cfed3b](https://github.com/stewwan/reative/commit/3cfed3b))
- **wip:** add parse driver ([b672cde](https://github.com/stewwan/reative/commit/b672cde))

### [1.4.3](https://github.com/stewwan/reative/compare/v1.4.2...v1.4.3) (2019-11-22)

### Bug Fixes

- **browser:** check for cache service availability ([25b7155](https://github.com/stewwan/reative/commit/25b7155))
- upgrade firebase and remove ionic from cache module ([62edbf6](https://github.com/stewwan/reative/commit/62edbf6))
- **browser:** catch setState exceptions ([c240fab](https://github.com/stewwan/reative/commit/c240fab))
- **browser:** check for state existence ([7ae88e1](https://github.com/stewwan/reative/commit/7ae88e1))
- **browser:** dispatch ([3665b6e](https://github.com/stewwan/reative/commit/3665b6e))
- **browser:** improve cache/state logic ([c30e6c0](https://github.com/stewwan/reative/commit/c30e6c0))
- **browser:** inscrease reliability of observables ([f8ddb2b](https://github.com/stewwan/reative/commit/f8ddb2b))
- **browser:** make better use of memory and logs ([7f9608e](https://github.com/stewwan/reative/commit/7f9608e))
- **browser:** memory leaks ([76cb540](https://github.com/stewwan/reative/commit/76cb540))
- **browser:** replace `super` calls with `this` ([92d469a](https://github.com/stewwan/reative/commit/92d469a))
- **browser:** state sync should listen for saveNetwork attribute ([7806a96](https://github.com/stewwan/reative/commit/7806a96))
- **parse:** make `on` verb work with newer browser strategy ([874d987](https://github.com/stewwan/reative/commit/874d987))
- **rr:** add response type ([1a24d3b](https://github.com/stewwan/reative/commit/1a24d3b))
- **rr:** store and browser support for ttl ([77ecf43](https://github.com/stewwan/reative/commit/77ecf43))
- **schematics:** export page schema ([59a477a](https://github.com/stewwan/reative/commit/59a477a))
- **schematics:** remove unnecessary suffix `-page` from component folder ([0b4130b](https://github.com/stewwan/reative/commit/0b4130b))
- **state:** feedState with key should use the get method rather loop ([16becd2](https://github.com/stewwan/reative/commit/16becd2))
- **store:** value is not iterable ([3835ebc](https://github.com/stewwan/reative/commit/3835ebc))
- **store:** cant import storage from here ([51c18bf](https://github.com/stewwan/reative/commit/51c18bf))
- **store:** need to return the state from store lol ([d451cbf](https://github.com/stewwan/reative/commit/d451cbf))
- **store:** setState was saving cache twice ([3726f2f](https://github.com/stewwan/reative/commit/3726f2f))
- when observable should be completed for ttl and redundance of diff fn ([25af5dd](https://github.com/stewwan/reative/commit/25af5dd))

### Features

- **firestore:** add `at` and `after` to api ([00b1723](https://github.com/stewwan/reative/commit/00b1723))
- **parse:** add aggregations ([cde7928](https://github.com/stewwan/reative/commit/cde7928))
- **parse:** add support for `.set` and `.update` ([a4e34bc](https://github.com/stewwan/reative/commit/a4e34bc))
- **rr:** add pub/sub api ([2716b9b](https://github.com/stewwan/reative/commit/2716b9b))
- **rr:** export diff function ([d520fa2](https://github.com/stewwan/reative/commit/d520fa2))
- **schematics:** add page ([92234a9](https://github.com/stewwan/reative/commit/92234a9))
- **state:** make feedState also accept a key ([246e5fb](https://github.com/stewwan/reative/commit/246e5fb))
- **state:** make getState also return from cache if needed ([1009945](https://github.com/stewwan/reative/commit/1009945))
- add pointer for parse, make .set and .update api stable and improve global options ([f56ae7a](https://github.com/stewwan/reative/commit/f56ae7a))
- **store:** add mutable option to getState ([3cfed3b](https://github.com/stewwan/reative/commit/3cfed3b))
- **wip:** add parse driver ([b672cde](https://github.com/stewwan/reative/commit/b672cde))

### [1.4.2](https://github.com/stewwan/reative/compare/v1.4.1...v1.4.2) (2019-11-22)

### Bug Fixes

- **browser:** check for cache service availability ([25b7155](https://github.com/stewwan/reative/commit/25b7155))
- upgrade firebase and remove ionic from cache module ([62edbf6](https://github.com/stewwan/reative/commit/62edbf6))
- **browser:** catch setState exceptions ([c240fab](https://github.com/stewwan/reative/commit/c240fab))
- **browser:** check for state existence ([7ae88e1](https://github.com/stewwan/reative/commit/7ae88e1))
- **browser:** dispatch ([3665b6e](https://github.com/stewwan/reative/commit/3665b6e))
- **browser:** improve cache/state logic ([c30e6c0](https://github.com/stewwan/reative/commit/c30e6c0))
- **browser:** inscrease reliability of observables ([f8ddb2b](https://github.com/stewwan/reative/commit/f8ddb2b))
- **browser:** make better use of memory and logs ([7f9608e](https://github.com/stewwan/reative/commit/7f9608e))
- **browser:** memory leaks ([76cb540](https://github.com/stewwan/reative/commit/76cb540))
- **browser:** replace `super` calls with `this` ([92d469a](https://github.com/stewwan/reative/commit/92d469a))
- **browser:** state sync should listen for saveNetwork attribute ([7806a96](https://github.com/stewwan/reative/commit/7806a96))
- **parse:** make `on` verb work with newer browser strategy ([874d987](https://github.com/stewwan/reative/commit/874d987))
- **rr:** add response type ([1a24d3b](https://github.com/stewwan/reative/commit/1a24d3b))
- **rr:** store and browser support for ttl ([77ecf43](https://github.com/stewwan/reative/commit/77ecf43))
- **schematics:** export page schema ([59a477a](https://github.com/stewwan/reative/commit/59a477a))
- **schematics:** remove unnecessary suffix `-page` from component folder ([0b4130b](https://github.com/stewwan/reative/commit/0b4130b))
- **state:** feedState with key should use the get method rather loop ([16becd2](https://github.com/stewwan/reative/commit/16becd2))
- **store:** value is not iterable ([3835ebc](https://github.com/stewwan/reative/commit/3835ebc))
- **store:** cant import storage from here ([51c18bf](https://github.com/stewwan/reative/commit/51c18bf))
- **store:** need to return the state from store lol ([d451cbf](https://github.com/stewwan/reative/commit/d451cbf))
- **store:** setState was saving cache twice ([3726f2f](https://github.com/stewwan/reative/commit/3726f2f))
- when observable should be completed for ttl and redundance of diff fn ([25af5dd](https://github.com/stewwan/reative/commit/25af5dd))

### Features

- **firestore:** add `at` and `after` to api ([00b1723](https://github.com/stewwan/reative/commit/00b1723))
- **parse:** add aggregations ([cde7928](https://github.com/stewwan/reative/commit/cde7928))
- **parse:** add support for `.set` and `.update` ([a4e34bc](https://github.com/stewwan/reative/commit/a4e34bc))
- **rr:** add pub/sub api ([2716b9b](https://github.com/stewwan/reative/commit/2716b9b))
- **rr:** export diff function ([d520fa2](https://github.com/stewwan/reative/commit/d520fa2))
- **schematics:** add page ([92234a9](https://github.com/stewwan/reative/commit/92234a9))
- **state:** make feedState also accept a key ([246e5fb](https://github.com/stewwan/reative/commit/246e5fb))
- **state:** make getState also return from cache if needed ([1009945](https://github.com/stewwan/reative/commit/1009945))
- add pointer for parse, make .set and .update api stable and improve global options ([f56ae7a](https://github.com/stewwan/reative/commit/f56ae7a))
- **store:** add mutable option to getState ([3cfed3b](https://github.com/stewwan/reative/commit/3cfed3b))
- **wip:** add parse driver ([b672cde](https://github.com/stewwan/reative/commit/b672cde))

### [1.4.1](https://github.com/stewwan/reative/compare/v1.4.0...v1.4.1) (2019-11-22)

### Bug Fixes

- **browser:** check for cache service availability ([25b7155](https://github.com/stewwan/reative/commit/25b7155))
- upgrade firebase and remove ionic from cache module ([62edbf6](https://github.com/stewwan/reative/commit/62edbf6))
- **browser:** catch setState exceptions ([c240fab](https://github.com/stewwan/reative/commit/c240fab))
- **browser:** check for state existence ([7ae88e1](https://github.com/stewwan/reative/commit/7ae88e1))
- **browser:** dispatch ([3665b6e](https://github.com/stewwan/reative/commit/3665b6e))
- **browser:** improve cache/state logic ([c30e6c0](https://github.com/stewwan/reative/commit/c30e6c0))
- **browser:** inscrease reliability of observables ([f8ddb2b](https://github.com/stewwan/reative/commit/f8ddb2b))
- **browser:** make better use of memory and logs ([7f9608e](https://github.com/stewwan/reative/commit/7f9608e))
- **browser:** memory leaks ([76cb540](https://github.com/stewwan/reative/commit/76cb540))
- **browser:** replace `super` calls with `this` ([92d469a](https://github.com/stewwan/reative/commit/92d469a))
- **browser:** state sync should listen for saveNetwork attribute ([7806a96](https://github.com/stewwan/reative/commit/7806a96))
- **parse:** make `on` verb work with newer browser strategy ([874d987](https://github.com/stewwan/reative/commit/874d987))
- when observable should be completed for ttl and redundance of diff fn ([25af5dd](https://github.com/stewwan/reative/commit/25af5dd))
- **rr:** add response type ([1a24d3b](https://github.com/stewwan/reative/commit/1a24d3b))
- **rr:** store and browser support for ttl ([77ecf43](https://github.com/stewwan/reative/commit/77ecf43))
- **schematics:** export page schema ([59a477a](https://github.com/stewwan/reative/commit/59a477a))
- **state:** feedState with key should use the get method rather loop ([16becd2](https://github.com/stewwan/reative/commit/16becd2))
- **store:** value is not iterable ([3835ebc](https://github.com/stewwan/reative/commit/3835ebc))
- **store:** cant import storage from here ([51c18bf](https://github.com/stewwan/reative/commit/51c18bf))
- **store:** need to return the state from store lol ([d451cbf](https://github.com/stewwan/reative/commit/d451cbf))
- **store:** setState was saving cache twice ([3726f2f](https://github.com/stewwan/reative/commit/3726f2f))

### Features

- **firestore:** add `at` and `after` to api ([00b1723](https://github.com/stewwan/reative/commit/00b1723))
- **parse:** add aggregations ([cde7928](https://github.com/stewwan/reative/commit/cde7928))
- **parse:** add support for `.set` and `.update` ([a4e34bc](https://github.com/stewwan/reative/commit/a4e34bc))
- **rr:** add pub/sub api ([2716b9b](https://github.com/stewwan/reative/commit/2716b9b))
- **rr:** export diff function ([d520fa2](https://github.com/stewwan/reative/commit/d520fa2))
- **schematics:** add page ([92234a9](https://github.com/stewwan/reative/commit/92234a9))
- **state:** make feedState also accept a key ([246e5fb](https://github.com/stewwan/reative/commit/246e5fb))
- **state:** make getState also return from cache if needed ([1009945](https://github.com/stewwan/reative/commit/1009945))
- add pointer for parse, make .set and .update api stable and improve global options ([f56ae7a](https://github.com/stewwan/reative/commit/f56ae7a))
- **store:** add mutable option to getState ([3cfed3b](https://github.com/stewwan/reative/commit/3cfed3b))
- **wip:** add parse driver ([b672cde](https://github.com/stewwan/reative/commit/b672cde))

## [1.4.0](https://github.com/stewwan/reative/compare/v1.3.4...v1.4.0) (2019-11-18)

## Deprecation

- `.query` method in chaining must be rewrite to fit in a `.where` clausule since it's now reserved for custom queries

## Feature Highlight

- rewrote `browser` plarform
- added `parse` driver

### Bug Fixes

- **browser:** inscrease reliability of observables ([f8ddb2b](https://github.com/stewwan/reative/commit/f8ddb2b))
- upgrade firebase and remove ionic from cache module ([62edbf6](https://github.com/stewwan/reative/commit/62edbf6))
- **browser:** catch setState exceptions ([c240fab](https://github.com/stewwan/reative/commit/c240fab))
- **browser:** check for cache service availability ([25b7155](https://github.com/stewwan/reative/commit/25b7155))
- **browser:** check for state existence ([7ae88e1](https://github.com/stewwan/reative/commit/7ae88e1))
- **browser:** dispatch ([3665b6e](https://github.com/stewwan/reative/commit/3665b6e))
- **browser:** improve cache/state logic ([c30e6c0](https://github.com/stewwan/reative/commit/c30e6c0))
- **browser:** make better use of memory and logs ([7f9608e](https://github.com/stewwan/reative/commit/7f9608e))
- **browser:** memory leaks ([76cb540](https://github.com/stewwan/reative/commit/76cb540))
- **browser:** replace `super` calls with `this` ([92d469a](https://github.com/stewwan/reative/commit/92d469a))
- **parse:** make `on` verb work with newer browser strategy ([874d987](https://github.com/stewwan/reative/commit/874d987))
- when observable should be completed for ttl and redundance of diff fn ([25af5dd](https://github.com/stewwan/reative/commit/25af5dd))
- **rr:** add response type ([1a24d3b](https://github.com/stewwan/reative/commit/1a24d3b))
- **rr:** store and browser support for ttl ([77ecf43](https://github.com/stewwan/reative/commit/77ecf43))
- **state:** feedState with key should use the get method rather loop ([16becd2](https://github.com/stewwan/reative/commit/16becd2))
- **store:** value is not iterable ([3835ebc](https://github.com/stewwan/reative/commit/3835ebc))
- **store:** cant import storage from here ([51c18bf](https://github.com/stewwan/reative/commit/51c18bf))
- **store:** need to return the state from store lol ([d451cbf](https://github.com/stewwan/reative/commit/d451cbf))
- **store:** setState was saving cache twice ([3726f2f](https://github.com/stewwan/reative/commit/3726f2f))

### Features

- **firestore:** add `at` and `after` to api ([00b1723](https://github.com/stewwan/reative/commit/00b1723))
- **parse:** add aggregations ([cde7928](https://github.com/stewwan/reative/commit/cde7928))
- **rr:** add pub/sub api ([2716b9b](https://github.com/stewwan/reative/commit/2716b9b))
- **rr:** export diff function ([d520fa2](https://github.com/stewwan/reative/commit/d520fa2))
- **schematics:** add page ([92234a9](https://github.com/stewwan/reative/commit/92234a9))
- **state:** make feedState also accept a key ([246e5fb](https://github.com/stewwan/reative/commit/246e5fb))
- **state:** make getState also return from cache if needed ([1009945](https://github.com/stewwan/reative/commit/1009945))
- **store:** add mutable option to getState ([3cfed3b](https://github.com/stewwan/reative/commit/3cfed3b))
- **wip:** add parse driver ([b672cde](https://github.com/stewwan/reative/commit/b672cde))

### [1.3.4](https://github.com/stewwan/reative/compare/v1.3.3...v1.3.4) (2019-11-14)

### Bug Fixes

- **browser:** dispatch ([3665b6e](https://github.com/stewwan/reative/commit/3665b6e))
- upgrade firebase and remove ionic from cache module ([62edbf6](https://github.com/stewwan/reative/commit/62edbf6))
- **browser:** catch setState exceptions ([c240fab](https://github.com/stewwan/reative/commit/c240fab))
- **browser:** check for cache service availability ([25b7155](https://github.com/stewwan/reative/commit/25b7155))
- **browser:** check for state existence ([7ae88e1](https://github.com/stewwan/reative/commit/7ae88e1))
- **browser:** improve cache/state logic ([c30e6c0](https://github.com/stewwan/reative/commit/c30e6c0))
- **browser:** inscrease reliability of observables ([f8ddb2b](https://github.com/stewwan/reative/commit/f8ddb2b))
- **browser:** make better use of memory and logs ([7f9608e](https://github.com/stewwan/reative/commit/7f9608e))
- **browser:** memory leaks ([76cb540](https://github.com/stewwan/reative/commit/76cb540))
- **browser:** replace `super` calls with `this` ([92d469a](https://github.com/stewwan/reative/commit/92d469a))
- **rr:** add response type ([1a24d3b](https://github.com/stewwan/reative/commit/1a24d3b))
- **rr:** store and browser support for ttl ([77ecf43](https://github.com/stewwan/reative/commit/77ecf43))
- **state:** feedState with key should use the get method rather loop ([16becd2](https://github.com/stewwan/reative/commit/16becd2))
- **store:** value is not iterable ([3835ebc](https://github.com/stewwan/reative/commit/3835ebc))
- **store:** cant import storage from here ([51c18bf](https://github.com/stewwan/reative/commit/51c18bf))
- **store:** need to return the state from store lol ([d451cbf](https://github.com/stewwan/reative/commit/d451cbf))
- **store:** setState was saving cache twice ([3726f2f](https://github.com/stewwan/reative/commit/3726f2f))
- when observable should be completed for ttl and redundance of diff fn ([25af5dd](https://github.com/stewwan/reative/commit/25af5dd))

### Features

- **firestore:** add `at` and `after` to api ([00b1723](https://github.com/stewwan/reative/commit/00b1723))
- **rr:** add pub/sub api ([2716b9b](https://github.com/stewwan/reative/commit/2716b9b))
- **rr:** export diff function ([d520fa2](https://github.com/stewwan/reative/commit/d520fa2))
- **schematics:** add page ([92234a9](https://github.com/stewwan/reative/commit/92234a9))
- **state:** make feedState also accept a key ([246e5fb](https://github.com/stewwan/reative/commit/246e5fb))
- **state:** make getState also return from cache if needed ([1009945](https://github.com/stewwan/reative/commit/1009945))
- **store:** add mutable option to getState ([3cfed3b](https://github.com/stewwan/reative/commit/3cfed3b))

### [1.3.3](https://github.com/stewwan/reative/compare/v1.3.2...v1.3.3) (2019-11-13)

### Bug Fixes

- **browser:** dispatch ([3665b6e](https://github.com/stewwan/reative/commit/3665b6e))
- upgrade firebase and remove ionic from cache module ([62edbf6](https://github.com/stewwan/reative/commit/62edbf6))
- **browser:** catch setState exceptions ([c240fab](https://github.com/stewwan/reative/commit/c240fab))
- **browser:** check for cache service availability ([25b7155](https://github.com/stewwan/reative/commit/25b7155))
- **browser:** check for state existence ([7ae88e1](https://github.com/stewwan/reative/commit/7ae88e1))
- **browser:** improve cache/state logic ([c30e6c0](https://github.com/stewwan/reative/commit/c30e6c0))
- **browser:** inscrease reliability of observables ([f8ddb2b](https://github.com/stewwan/reative/commit/f8ddb2b))
- **browser:** make better use of memory and logs ([7f9608e](https://github.com/stewwan/reative/commit/7f9608e))
- **browser:** memory leaks ([76cb540](https://github.com/stewwan/reative/commit/76cb540))
- **browser:** replace `super` calls with `this` ([92d469a](https://github.com/stewwan/reative/commit/92d469a))
- **rr:** add response type ([1a24d3b](https://github.com/stewwan/reative/commit/1a24d3b))
- **rr:** store and browser support for ttl ([77ecf43](https://github.com/stewwan/reative/commit/77ecf43))
- **state:** feedState with key should use the get method rather loop ([16becd2](https://github.com/stewwan/reative/commit/16becd2))
- **store:** value is not iterable ([3835ebc](https://github.com/stewwan/reative/commit/3835ebc))
- when observable should be completed for ttl and redundance of diff fn ([25af5dd](https://github.com/stewwan/reative/commit/25af5dd))
- **store:** cant import storage from here ([51c18bf](https://github.com/stewwan/reative/commit/51c18bf))
- **store:** setState was saving cache twice ([3726f2f](https://github.com/stewwan/reative/commit/3726f2f))

### Features

- **firestore:** add `at` and `after` to api ([00b1723](https://github.com/stewwan/reative/commit/00b1723))
- **rr:** add pub/sub api ([2716b9b](https://github.com/stewwan/reative/commit/2716b9b))
- **rr:** export diff function ([d520fa2](https://github.com/stewwan/reative/commit/d520fa2))
- **schematics:** add page ([92234a9](https://github.com/stewwan/reative/commit/92234a9))
- **state:** make feedState also accept a key ([246e5fb](https://github.com/stewwan/reative/commit/246e5fb))
- **state:** make getState also return from cache if needed ([1009945](https://github.com/stewwan/reative/commit/1009945))
- **store:** add mutable option to getState ([3cfed3b](https://github.com/stewwan/reative/commit/3cfed3b))

### [1.3.2](https://github.com/stewwan/reative/compare/v1.3.1...v1.3.2) (2019-11-08)

### Bug Fixes

- **browser:** improve cache/state logic ([c30e6c0](https://github.com/stewwan/reative/commit/c30e6c0))
- upgrade firebase and remove ionic from cache module ([62edbf6](https://github.com/stewwan/reative/commit/62edbf6))
- when observable should be completed for ttl and redundance of diff fn ([25af5dd](https://github.com/stewwan/reative/commit/25af5dd))
- **browser:** catch setState exceptions ([c240fab](https://github.com/stewwan/reative/commit/c240fab))
- **browser:** check for cache service availability ([25b7155](https://github.com/stewwan/reative/commit/25b7155))
- **browser:** check for state existence ([7ae88e1](https://github.com/stewwan/reative/commit/7ae88e1))
- **browser:** dispatch ([3665b6e](https://github.com/stewwan/reative/commit/3665b6e))
- **browser:** inscrease reliability of observables ([f8ddb2b](https://github.com/stewwan/reative/commit/f8ddb2b))
- **browser:** make better use of memory and logs ([7f9608e](https://github.com/stewwan/reative/commit/7f9608e))
- **browser:** memory leaks ([76cb540](https://github.com/stewwan/reative/commit/76cb540))
- **browser:** replace `super` calls with `this` ([92d469a](https://github.com/stewwan/reative/commit/92d469a))
- **rr:** store and browser support for ttl ([77ecf43](https://github.com/stewwan/reative/commit/77ecf43))
- **state:** feedState with key should use the get method rather loop ([16becd2](https://github.com/stewwan/reative/commit/16becd2))
- **store:** value is not iterable ([3835ebc](https://github.com/stewwan/reative/commit/3835ebc))
- **store:** cant import storage from here ([51c18bf](https://github.com/stewwan/reative/commit/51c18bf))

### Features

- **firestore:** add `at` and `after` to api ([00b1723](https://github.com/stewwan/reative/commit/00b1723))
- **rr:** add pub/sub api ([2716b9b](https://github.com/stewwan/reative/commit/2716b9b))
- **rr:** export diff function ([d520fa2](https://github.com/stewwan/reative/commit/d520fa2))
- **schematics:** add page ([92234a9](https://github.com/stewwan/reative/commit/92234a9))
- **state:** make feedState also accept a key ([246e5fb](https://github.com/stewwan/reative/commit/246e5fb))
- **state:** make getState also return from cache if needed ([1009945](https://github.com/stewwan/reative/commit/1009945))
- **store:** add mutable option to getState ([3cfed3b](https://github.com/stewwan/reative/commit/3cfed3b))

### [1.3.1](https://github.com/stewwan/reative/compare/v1.3.0...v1.3.1) (2019-10-03)

### Bug Fixes

- **store:** value is not iterable ([3835ebc](https://github.com/stewwan/reative/commit/3835ebc))

### Features

- **firestore:** add `at` and `after` to api ([00b1723](https://github.com/stewwan/reative/commit/00b1723))
- **rr:** add pub/sub api ([2716b9b](https://github.com/stewwan/reative/commit/2716b9b))
- **rr:** export diff function ([d520fa2](https://github.com/stewwan/reative/commit/d520fa2))
- **state:** make feedState also accept a key ([246e5fb](https://github.com/stewwan/reative/commit/246e5fb))
- **state:** make getState also return from cache if needed ([1009945](https://github.com/stewwan/reative/commit/1009945))
- **store:** add mutable option to getState ([3cfed3b](https://github.com/stewwan/reative/commit/3cfed3b))

## [1.3.0](https://github.com/stewwan/reative/compare/v1.2.1...v1.3.0) (2019-09-27)

### Bug Fixes

- **state:** feedState with key should use the get method rather loop ([16becd2](https://github.com/stewwan/reative/commit/16becd2))

### Features

- **rr:** add pub/sub api ([2716b9b](https://github.com/stewwan/reative/commit/2716b9b))
- **store:** add mutable option to getState ([3cfed3b](https://github.com/stewwan/reative/commit/3cfed3b))

### [1.2.1](https://github.com/stewwan/reative/compare/v1.2.0...v1.2.1) (2019-09-13)

### Bug Fixes

- **rr:** store and browser support for ttl ([77ecf43](https://github.com/stewwan/reative/commit/77ecf43))
- **store:** cant import storage from here ([51c18bf](https://github.com/stewwan/reative/commit/51c18bf))

### Features

- **rr:** export diff function ([d520fa2](https://github.com/stewwan/reative/commit/d520fa2))
- **state:** make feedState also accept a key ([246e5fb](https://github.com/stewwan/reative/commit/246e5fb))
- **state:** make getState also return from cache if needed ([1009945](https://github.com/stewwan/reative/commit/1009945))

## [1.2.0](https://github.com/stewwan/reative/compare/v1.1.2...v1.2.0) (2019-09-03)

### Bug Fixes

- **rr:** store and browser support for ttl ([77ecf43](https://github.com/stewwan/reative/commit/77ecf43))
- **store:** cant import storage from here ([51c18bf](https://github.com/stewwan/reative/commit/51c18bf))

### Features

- **rr:** export diff function ([d520fa2](https://github.com/stewwan/reative/commit/d520fa2))
- **state:** make getState also return from cache if needed ([1009945](https://github.com/stewwan/reative/commit/1009945))

### [1.1.2](https://github.com/stewwan/reative/compare/v1.1.1...v1.1.2) (2019-08-30)

### Bug Fixes

- **browser:** replace `super` calls with `this` ([92d469a](https://github.com/stewwan/reative/commit/92d469a))
- **rr:** store and browser support for ttl ([77ecf43](https://github.com/stewwan/reative/commit/77ecf43))

### [1.1.1](https://github.com/stewwan/reative/compare/v1.1.0...v1.1.1) (2019-08-01)

### Bug Fixes

- upgrade firebase and remove ionic from cache module ([62edbf6](https://github.com/stewwan/reative/commit/62edbf6))

## [1.1.0](https://github.com/stewwan/reative/compare/v1.0.11...v1.1.0) (2019-08-01)

### Features

- **state:** rework of how core are being persisted on state. now it should assume a top level object on state, rather than live in a single array index. ([6c3719b](https://github.com/stewwan/reative/commit/6c3719b))

### [1.0.11](https://github.com/stewwan/reative/compare/v1.0.10...v1.0.11) (2019-08-01)

### Bug Fixes

- **state:** make sure key is being set ([af6fcfd](https://github.com/stewwan/reative/commit/af6fcfd))

### [1.0.10](https://github.com/stewwan/reative/compare/v1.0.9...v1.0.10) (2019-07-31)

### Bug Fixes

- **state:** make setState update an existing result without moving its position ([b6e9280](https://github.com/stewwan/reative/commit/b6e9280))

### [1.0.9](https://github.com/stewwan/reative/compare/v1.0.8...v1.0.9) (2019-07-31)

### Bug Fixes

- **state:** add raw param for the select function ([81f5a5b](https://github.com/stewwan/reative/commit/81f5a5b))

### [1.0.8](https://github.com/stewwan/reative/compare/v1.0.7...v1.0.8) (2019-07-29)

### Features

- export pure functions for isOnline, firebase, firestore and resetCache ([5379891](https://github.com/stewwan/reative/commit/5379891))

### [1.0.7](https://github.com/stewwan/reative/compare/v1.0.6...v1.0.7) (2019-07-29)

### Bug Fixes

- **rr:** transformResponse was not working properly ([ac89875](https://github.com/stewwan/reative/commit/ac89875))

### [1.0.6](https://github.com/stewwan/reative/compare/v1.0.5...v1.0.6) (2019-07-29)

### Features

- **state** add more controls

### [1.0.5](https://github.com/stewwan/reative/compare/v1.0.4...v1.0.5) (2019-07-23)

### Bug Fixes

- **schematics:** component selector ([60921b9](https://github.com/stewwan/reative/commit/60921b9))

### [1.0.4](https://github.com/stewwan/reative/compare/v1.0.3...v1.0.4) (2019-07-23)

### Bug Fixes

- **state:** check for object ([af68a2e](https://github.com/stewwan/reative/commit/af68a2e))

### [1.0.3](https://github.com/stewwan/reative/compare/v1.0.2...v1.0.3) (2019-07-23)

### Bug Fixes

- **state:** check for payload existence ([cdf9daf](https://github.com/stewwan/reative/commit/cdf9daf))
- **store:** correct check for payload ([3f9a45d](https://github.com/stewwan/reative/commit/3f9a45d))

## [1.0.2](https://github.com/stewwan/reative/compare/v1.0.1...v1.0.2) (2019-07-23)

- fix(store): check for record existence

### [1.0.1](https://github.com/stewwan/reative/compare/v1.0.0...v1.0.1) (2019-07-22)

### Bug Fixes

- **schematics:** adjust find method in template ([b77f72a](https://github.com/stewwan/reative/commit/b77f72a))
- **schematics:** collection http config ([b400e75](https://github.com/stewwan/reative/commit/b400e75))
- **schematics:** remove .data method from chaining ([3f7f90f](https://github.com/stewwan/reative/commit/3f7f90f))

### Features

- add schematics for component and containers ([b82988b](https://github.com/stewwan/reative/commit/b82988b))
- set schematics up ([501660b](https://github.com/stewwan/reative/commit/501660b))

## [1.0.0](https://github.com/stewwan/reative/compare/v0.2.14...v1.0.0) (2019-07-21)

## Migration Guide to v1

- Delete `node_modules`
- Remove `@firetask/core` (if exists)
- Replace `firetask` to `reative`
- Make sure all reative packages are in version `^1.0.1`
- Replace `.useLog` to `.silent`
- Replace `@reative/ionic` to `@reative/cache`
- Replace `reactive-record` to `core`
- Replace `ReactiveRecord` to `Records`
- Replace `ReactiveModule` to `RecordsModule`
- Replace `ReactiveIonicModule` to `CacheModule`
- Replace `ReactiveFirebaseModule` to `FirebaseModule`
- Replace `$collection.storage()` to the pure function `storage()` exported by cache package
- Replace `ReactiveState` to `State`
- Replace `ReactiveStateModule` to `StateModule`

```ts
// before
this.storage = this.$collection.storage();
// after
import { storage } from '@reative/cache';
this.storage = storage();
```

### Now data is formatted by default, so you don't need to transform it at all. Disable this behaviour by passing `.raw(true)` within the chain

- Remove `.data(true)`
- Remove any `.transformNetwork` or `.transform` that acts as a shortcut to get pure data eg: `.transform(r=>r.data)`
- replace `.useNetwork` to just `network`
- replace `.useCache` to just `cache`

### Bug Fixes

- **rr:** move storage and connector out of options ([834d5d0](https://github.com/stewwan/reative/commit/834d5d0))
- **state:** make it work using just 2 params ([44bc467](https://github.com/stewwan/reative/commit/44bc467))
- **store:** add data as second param for the select method ([3bcc78c](https://github.com/stewwan/reative/commit/3bcc78c))
- changelog ([8e6bd94](https://github.com/stewwan/reative/commit/8e6bd94))
- changelog ([d02ebad](https://github.com/stewwan/reative/commit/d02ebad))

### Features

- add schematics for component and containers ([b82988b](https://github.com/stewwan/reative/commit/b82988b))
- **cache:** add getter function ([29d68e6](https://github.com/stewwan/reative/commit/29d68e6))
- **r:** add a way to retrieve states synchronously through rr api ([667d565](https://github.com/stewwan/reative/commit/667d565))
- **rr:** **deprecation** now by default RR should return data formatted, unless you deactive this behavior via `raw` method. ([b28bf9d](https://github.com/stewwan/reative/commit/b28bf9d))
- **rr:** add useState ([d420fdc](https://github.com/stewwan/reative/commit/d420fdc))
- **rr:** introduce the `silent` option ([bd92f52](https://github.com/stewwan/reative/commit/bd92f52))
- **state:** add select ([1512fd0](https://github.com/stewwan/reative/commit/1512fd0))
- **state:** move state getter/setter from rr ([1c83e29](https://github.com/stewwan/reative/commit/1c83e29))
- **store:** add getState ([18bd10f](https://github.com/stewwan/reative/commit/18bd10f))
- **store:** add setState ([6d3f0fe](https://github.com/stewwan/reative/commit/6d3f0fe))

### [0.2.15](https://github.com/stewwan/reative/compare/v0.2.14...v0.2.15) (2019-07-18)

### Bug Fixes

- changelog ([d02ebad](https://github.com/stewwan/reative/commit/d02ebad))
- **firestore:** return a new state ([5e8a040](https://github.com/stewwan/reative/commit/5e8a040))
- **rr:** move storage and connector out of options ([834d5d0](https://github.com/stewwan/reative/commit/834d5d0))
- **state:** make it work using just 2 params ([44bc467](https://github.com/stewwan/reative/commit/44bc467))

### Features

- **rr:** add a way to retrieve states synchronously through rr api ([667d565](https://github.com/stewwan/reative/commit/667d565))
- **rr:** add useState ([d420fdc](https://github.com/stewwan/reative/commit/d420fdc))
- **rr:** introduce the `silent` option ([bd92f52](https://github.com/stewwan/reative/commit/bd92f52))
- **state:** add select ([1512fd0](https://github.com/stewwan/reative/commit/1512fd0))
- **state:** move state getter/setter from rr ([1c83e29](https://github.com/stewwan/reative/commit/1c83e29))
- **store:** add getState ([18bd10f](https://github.com/stewwan/reative/commit/18bd10f))
- **store:** add setState ([6d3f0fe](https://github.com/stewwan/reative/commit/6d3f0fe))

### [0.2.14](https://github.com/stewwan/reative/compare/v0.2.13...v0.2.14) (2019-07-16)

### [0.2.13](https://github.com/stewwan/reative/compare/v0.2.12...v0.2.13) (2019-07-16)

### Bug Fixes

- **rr:** diff function ([5617f62](https://github.com/stewwan/reative/commit/5617f62))
- **state:** store was duplicating core ([3249049](https://github.com/stewwan/reative/commit/3249049))
- **store:** again, make data param default to true for key method ([19ca350](https://github.com/stewwan/reative/commit/19ca350))
- closes [#14](https://github.com/stewwan/reative/issues/14) ([9a200fa](https://github.com/stewwan/reative/commit/9a200fa))

### Features

- **rr:** add isOnline method and fix diff strategy ([0a4450d](https://github.com/stewwan/reative/commit/0a4450d))
- **state:** merge elastic response detection ([0eae9a3](https://github.com/stewwan/reative/commit/0eae9a3))
- **store:** make data param default to true ([00ee431](https://github.com/stewwan/reative/commit/00ee431))
- **storybook:** add storysource plugin ([376dd65](https://github.com/stewwan/reative/commit/376dd65))

### [0.2.12](https://github.com/stewwan/reative/compare/v0.2.11...v0.2.12) (2019-07-15)

### Bug Fixes

- **state:** store was duplicating core ([3249049](https://github.com/stewwan/reative/commit/3249049))

### [0.2.11](https://github.com/stewwan/reative/compare/v0.2.10...v0.2.11) (2019-07-15)

### Bug Fixes

- **rr:** diff function ([5617f62](https://github.com/stewwan/reative/commit/5617f62))

### Features

- **rr:** add isOnline method and fix diff strategy ([0a4450d](https://github.com/stewwan/reative/commit/0a4450d))
- **state:** merge elastic response detection ([0eae9a3](https://github.com/stewwan/reative/commit/0eae9a3))
- **store:** make data param default to true ([00ee431](https://github.com/stewwan/reative/commit/00ee431))

## [0.2.10](https://github.com/stewwan/reative/compare/v0.2.9...v0.2.10) (2019-07-15)

### Features

- **state:** merge elastic response detection ([0eae9a3](https://github.com/stewwan/reative/commit/0eae9a3))

## [0.2.9](https://github.com/stewwan/reative/compare/v0.2.7...v0.2.9) (2019-07-12)

### Features

- **rr:** add isOnline method and fix diff strategy ([0a4450d](https://github.com/stewwan/reative/commit/0a4450d))

### [0.2.8](https://github.com/stewwan/reative/compare/v0.2.7...v0.2.8) (2019-07-10)

### Bug Fixes

- **rr:** diff function ([5617f62](https://github.com/stewwan/reative/commit/5617f62))

### Features

- **storybook:** add storysource plugin ([376dd65](https://github.com/stewwan/reative/commit/376dd65))

### [0.2.7](https://github.com/stewwan/reative/compare/v0.2.6...v0.2.7) (2019-06-25)

### Features

- **rr:** expose instance using `storage()` method ([825cc21](https://github.com/stewwan/reative/commit/825cc21))

### [0.2.6](https://github.com/stewwan/reative/compare/v0.2.5...v0.2.6) (2019-06-24)

### Bug Fixes

- **rr:** tests ([31f6782](https://github.com/stewwan/reative/commit/31f6782))

### Features

- **rr:** implement use case `cache true` with `network false` ([cf5ee17](https://github.com/stewwan/reative/commit/cf5ee17))
- **rr:** improve reactivity system ([dcf2bb7](https://github.com/stewwan/reative/commit/dcf2bb7))

### [0.2.5](https://github.com/stewwan/reative/compare/v0.2.4...v0.2.5) (2019-06-22)

### Bug Fixes

- **rr:** browser needs to merge options ([cd7457e](https://github.com/stewwan/reative/commit/cd7457e))
- **rr:** driver initialization bug ([caebaa2](https://github.com/stewwan/reative/commit/caebaa2))
- **rr:** now we have just a single `transform` fn in the chain for better readability ([9ab568c](https://github.com/stewwan/reative/commit/9ab568c))
- **rr:** weird behaviors on browser platform when testing from a vue app ([cfe7b56](https://github.com/stewwan/reative/commit/cfe7b56))

### [0.2.4](https://github.com/stewwan/reative/compare/v0.2.3...v0.2.4) (2019-06-21)

### Bug Fixes

- libs initialization ([448b73e](https://github.com/stewwan/reative/commit/448b73e))

### [0.2.3](https://github.com/stewwan/reative/compare/v0.2.2...v0.2.3) (2019-06-21)

### Bug Fixes

- reative internal dep ([e4a9c13](https://github.com/stewwan/reative/commit/e4a9c13))

### [0.2.2](https://github.com/stewwan/reative/compare/v0.2.1...v0.2.2) (2019-06-21)

### Bug Fixes

- edge case on deploy script and add travis to the newer packages ([c40a31e](https://github.com/stewwan/reative/commit/c40a31e))

### [0.2.1](https://github.com/stewwan/reative/compare/v0.2.0...v0.2.1) (2019-06-21)

### Bug Fixes

- update packages ([b93e8c0](https://github.com/stewwan/reative/commit/b93e8c0))

## [0.2.0](https://github.com/stewwan/reative/compare/v0.1.5...v0.2.0) (2019-06-21)

### Bug Fixes

- angular package, makes it more independent ([7310ae5](https://github.com/stewwan/reative/commit/7310ae5))
- **rr:** firebase specs ([2a0c797](https://github.com/stewwan/reative/commit/2a0c797))
- **rr:** move storage helper to the core package ([23c0b78](https://github.com/stewwan/reative/commit/23c0b78))
- **rr:** update demo app to use latest packages ([0bc1b58](https://github.com/stewwan/reative/commit/0bc1b58))
- **rr:** verb `on` for firebase should return an observable ([d2fa134](https://github.com/stewwan/reative/commit/d2fa134))
- **rr:** was transforming response twice ([b27bfd6](https://github.com/stewwan/reative/commit/b27bfd6))
- bump tool ([a587137](https://github.com/stewwan/reative/commit/a587137))
- ionic package ([a5e75be](https://github.com/stewwan/reative/commit/a5e75be))

### Features

- add new lib firebase ([5a24461](https://github.com/stewwan/reative/commit/5a24461))
- add state package ([256ad1d](https://github.com/stewwan/reative/commit/256ad1d))

### [0.1.5](https://github.com/stewwan/reative/compare/v0.1.4...v0.1.5) (2019-06-19)

### Bug Fixes

- **rr:** response state ([b09206b](https://github.com/stewwan/reative/commit/b09206b))

### [0.1.4](https://github.com/stewwan/reative/compare/v0.1.3...v0.1.4) (2019-06-19)

### Bug Fixes

- **rr:** do not complete observable when useNetwork true and useCache false ([0a26956](https://github.com/stewwan/reative/commit/0a26956))

### [0.1.3](https://github.com/stewwan/reative/compare/v0.1.2...v0.1.3) (2019-06-18)

### Bug Fixes

- release script ([ff2e4e5](https://github.com/stewwan/reative/commit/ff2e4e5))

### [0.1.2](https://github.com/stewwan/reative/compare/v0.1.1...v0.1.2) (2019-06-18)

### Bug Fixes

- **ionic:** jest setup ([4fe0702](https://github.com/stewwan/reative/commit/4fe0702))
- **rr:** fix specs ([788d2de](https://github.com/stewwan/reative/commit/788d2de))

### Features

- add test setup to the other libs ([91f5aea](https://github.com/stewwan/reative/commit/91f5aea))

### [0.1.1](https://github.com/stewwan/reative/compare/v0.1.0...v0.1.1) (2019-06-17)

<a name="0.1.0"></a>

# 0.1.0 (2019-06-17)

### Bug Fixes

- **firebase:** check for object results ([dc8528f](https://github.com/stewwan/reative/commit/dc8528f))
- **or:** remove hooks and deprecated apis completely ([4005630](https://github.com/stewwan/reative/commit/4005630))
- **rr:** `on` verb wasnt working as expected and fixes [#8](https://github.com/stewwan/reative/issues/8) [#9](https://github.com/stewwan/reative/issues/9) ([75765a8](https://github.com/stewwan/reative/commit/75765a8))
- **rr:** add a new exception for firebase and fix the old rr way ([59f024f](https://github.com/stewwan/reative/commit/59f024f))
- **rr:** browser chaining and make sure to return response from network only if different from cache ([cc6ebb3](https://github.com/stewwan/reative/commit/cc6ebb3))
- **rr:** browser platform should complete observer before set cache ([f9ae0aa](https://github.com/stewwan/reative/commit/f9ae0aa))
- **rr:** build for prod ([f237aec](https://github.com/stewwan/reative/commit/f237aec))
- **rr:** check for falsy ref on firebase driver ([963b4c6](https://github.com/stewwan/reative/commit/963b4c6))
- **rr:** collection initialisation log ([ee5b22a](https://github.com/stewwan/reative/commit/ee5b22a))
- **rr:** dispatch test ([7c3755d](https://github.com/stewwan/reative/commit/7c3755d))
- **rr:** driver option for runtime executions ([5a90bc8](https://github.com/stewwan/reative/commit/5a90bc8))
- **rr:** exception and start work of chrome extension ([eef8438](https://github.com/stewwan/reative/commit/eef8438))
- **rr:** firebase connector ([45da78c](https://github.com/stewwan/reative/commit/45da78c))
- **rr:** firebase/firestore connectors ([2e8b2dd](https://github.com/stewwan/reative/commit/2e8b2dd))
- **rr:** firestore adjusts ([887ffcb](https://github.com/stewwan/reative/commit/887ffcb))
- **rr:** http response ([0a6802a](https://github.com/stewwan/reative/commit/0a6802a))
- **rr:** improve log trace ([eaeeeb1](https://github.com/stewwan/reative/commit/eaeeeb1))
- **rr:** key creation strategy ([0897a2b](https://github.com/stewwan/reative/commit/0897a2b))
- **rr:** move store stuff to firestask/angular module ([1d77c8f](https://github.com/stewwan/reative/commit/1d77c8f))
- **rr:** observable wasnt running twice with cache ([4c26cfd](https://github.com/stewwan/reative/commit/4c26cfd))
- **rr:** platform browser and improve logs ([cbff6c7](https://github.com/stewwan/reative/commit/cbff6c7))
- **rr:** remove ngxs as a peer dep ([3a78237](https://github.com/stewwan/reative/commit/3a78237))
- **rr:** remove shouldTransform ([4f46d20](https://github.com/stewwan/reative/commit/4f46d20))
- **rr:** schematics ([340f2ba](https://github.com/stewwan/reative/commit/340f2ba))
- cached responses ([cab7fe3](https://github.com/stewwan/reative/commit/cab7fe3))
- fire drivers and add driver as a new prop in response metadata ([434f530](https://github.com/stewwan/reative/commit/434f530))
- **rr:** verbs response type ([1de4e37](https://github.com/stewwan/reative/commit/1de4e37))
- ionic release ([27a783f](https://github.com/stewwan/reative/commit/27a783f))
- **rr:** storage and firestore driver for offline conditions ([5a6ce63](https://github.com/stewwan/reative/commit/5a6ce63))
- package version ([885e9e1](https://github.com/stewwan/reative/commit/885e9e1))
- **rr:** should return response immediately ([655b189](https://github.com/stewwan/reative/commit/655b189))
- **rr:** some issues related with useCache false on browser ([f9f1774](https://github.com/stewwan/reative/commit/f9f1774))
- **rr:** types ([35459e8](https://github.com/stewwan/reative/commit/35459e8))
- **rr:** use a different name for `call` on browser ([a7fed76](https://github.com/stewwan/reative/commit/a7fed76))
- **rr:** useCache on chaining ([b51b2c5](https://github.com/stewwan/reative/commit/b51b2c5))
- **rr:** useNetwork yes and useCache yes should return two responses rather than just one ([a0b070b](https://github.com/stewwan/reative/commit/a0b070b))
- **rr:** verb `on` from firestore driver was not adding key to the cache metadata ([cfa1a6b](https://github.com/stewwan/reative/commit/cfa1a6b))
- **rr:** verify for network status in `on` verb ([5cd9c85](https://github.com/stewwan/reative/commit/5cd9c85))
- **rr:** weird behaviors and improve internal logs ([ea494f3](https://github.com/stewwan/reative/commit/ea494f3))
- **rr/firestore:** add experimentalTabSynchronization ([3be44bb](https://github.com/stewwan/reative/commit/3be44bb))
- **rr/firestore:** driver log ([f74152b](https://github.com/stewwan/reative/commit/f74152b))
- **rr/play:** chaining api ([15a9ed5](https://github.com/stewwan/reative/commit/15a9ed5))
- **rr/play:** remove ts notation ([0d5ceac](https://github.com/stewwan/reative/commit/0d5ceac))
- **ui:** say method should present internally ([cd6cf73](https://github.com/stewwan/reative/commit/cd6cf73))

### Features

- **rr:** add feed method to fill store with cached responses on startup ([0774875](https://github.com/stewwan/reative/commit/0774875))
- add release scripts ([48fb579](https://github.com/stewwan/reative/commit/48fb579))
- add schematics for rr collection ([7f26c48](https://github.com/stewwan/reative/commit/7f26c48))
- add some server specs ([099a679](https://github.com/stewwan/reative/commit/099a679))
- **rr:** improve selector ([d7b5abd](https://github.com/stewwan/reative/commit/d7b5abd))
- start workspace with the new rr lib ([5a13f65](https://github.com/stewwan/reative/commit/5a13f65))
- **firestore:** add ability to cache for the `on` verb ([462e7e4](https://github.com/stewwan/reative/commit/462e7e4))
- **ionic:** add say method to the ui ([382412c](https://github.com/stewwan/reative/commit/382412c))
- **rr:** add a shortcut for transform data response ([891893c](https://github.com/stewwan/reative/commit/891893c))
- **rr:** add CI and coverage ([cfade94](https://github.com/stewwan/reative/commit/cfade94))
- **rr:** add clearCache to api ([128a330](https://github.com/stewwan/reative/commit/128a330))
- **rr:** add global config ([876ac25](https://github.com/stewwan/reative/commit/876ac25))
- **rr:** add logger ([bf884ec](https://github.com/stewwan/reative/commit/bf884ec))
- **rr:** add more browser tests ([4712d56](https://github.com/stewwan/reative/commit/4712d56))
- **rr:** add more tests for firestore driver ([c07e65d](https://github.com/stewwan/reative/commit/c07e65d))
- **rr:** add more tests for firestore driver ([7bd7138](https://github.com/stewwan/reative/commit/7bd7138))
- **rr:** add more types to storage adapter and expose to public api ([cb2a5e3](https://github.com/stewwan/reative/commit/cb2a5e3))
- **rr:** add some specs for browser platform ([6a30ce8](https://github.com/stewwan/reative/commit/6a30ce8))
- **rr:** add store reset ([7364122](https://github.com/stewwan/reative/commit/7364122))
- **rr:** add tests for symbols ([cb2a09c](https://github.com/stewwan/reative/commit/cb2a09c))
- **rr:** add the new chain option `diff` ([905d92f](https://github.com/stewwan/reative/commit/905d92f))
- **rr:** add verb to cache key ([ffd825c](https://github.com/stewwan/reative/commit/ffd825c))
- **rr:** complete firestore driver tests ([31596e0](https://github.com/stewwan/reative/commit/31596e0))
- **rr:** complete unit tests for firebase driver \o/ ([05ce0f7](https://github.com/stewwan/reative/commit/05ce0f7))
- **rr:** expose drivers ([b928727](https://github.com/stewwan/reative/commit/b928727))
- **rr:** finish browser specs ([83b8eb6](https://github.com/stewwan/reative/commit/83b8eb6))
- **rr:** finish drivers tests ([8d41f12](https://github.com/stewwan/reative/commit/8d41f12))
- **rr:** finish server tests ([686b698](https://github.com/stewwan/reative/commit/686b698))
- **rr:** implement store and key selector ([dd7e77e](https://github.com/stewwan/reative/commit/dd7e77e))
- **rr:** improve traced log ([c7cbffc](https://github.com/stewwan/reative/commit/c7cbffc))
- **rr:** make it fully initializable via angular RecordsModule ([72ba484](https://github.com/stewwan/reative/commit/72ba484))
- **rr:** move http stuff to a separate driver and add the possibility to use a custom http connector, like the angular http client ([7f785e4](https://github.com/stewwan/reative/commit/7f785e4))
- **rr:** only feed the specific collection ([0d30c44](https://github.com/stewwan/reative/commit/0d30c44))
- **rr:** reduce redundant code and apply the verb mapping ([e61e9e7](https://github.com/stewwan/reative/commit/e61e9e7))
- **rr:** remove moment as dependency and add some tests for firestore driver ([bf8f83d](https://github.com/stewwan/reative/commit/bf8f83d))
- **rr:** remove redundant code from browser and add some tests ([93ce228](https://github.com/stewwan/reative/commit/93ce228))
- **rr:** uncouple old hooks from http. improve abstraction by separating concerns between browser x server ([2c52502](https://github.com/stewwan/reative/commit/2c52502))
- **rr/play:** add basic real interaction using services ([34d7213](https://github.com/stewwan/reative/commit/34d7213))
- **rr/play:** add browser/server tabs ([ea3361c](https://github.com/stewwan/reative/commit/ea3361c))
- **rr/play:** add cache explorer ([38fa752](https://github.com/stewwan/reative/commit/38fa752))
- **rr/play:** add cache-explorer-container ([ff76685](https://github.com/stewwan/reative/commit/ff76685))
- **rr/play:** add chain verb and wip cache explorer ([730a981](https://github.com/stewwan/reative/commit/730a981))
- **rr/play:** add collection chooser ([2f00a23](https://github.com/stewwan/reative/commit/2f00a23))
- **rr/play:** add collection scheme container ([3789bc7](https://github.com/stewwan/reative/commit/3789bc7))
- **rr/play:** add collections ([e8a7920](https://github.com/stewwan/reative/commit/e8a7920))
- **rr/play:** add initial working structure with 3 field types ([8f9c58c](https://github.com/stewwan/reative/commit/8f9c58c))
- **rr/play:** add json tree viewer ([16b2ebf](https://github.com/stewwan/reative/commit/16b2ebf))
- **rr/play:** add log card ([052ee07](https://github.com/stewwan/reative/commit/052ee07))
- **rr/play:** add log methods ([2aec780](https://github.com/stewwan/reative/commit/2aec780))
- **rr/play:** add transformCache method ([7a95e24](https://github.com/stewwan/reative/commit/7a95e24))
- transform data from elastic ([7a5e411](https://github.com/stewwan/reative/commit/7a5e411))
- **rr/play:** implement select field ([168b670](https://github.com/stewwan/reative/commit/168b670))
- **rr/play:** make browser/server tabs work ([c8d933f](https://github.com/stewwan/reative/commit/c8d933f))
- **rr/play:** refactor to ngxs ([6977b2a](https://github.com/stewwan/reative/commit/6977b2a))
- **rr/play:** verb chooser separated into its own component ([af5c73a](https://github.com/stewwan/reative/commit/af5c73a))

### Performance Improvements

- **rr:** clean up code by removing `request`stuff and fixes browser platform related issues ([c225bae](https://github.com/stewwan/reative/commit/c225bae))
* identifier usage ([69c0444](https://github.com/rebasedjs/rebasedjs/commit/69c0444107a5e54c46322dadc1a9c6121f5a586a))
* isDiff fn ([214e982](https://github.com/rebasedjs/rebasedjs/commit/214e9820871df5d936e9955096758ad24a20646b))
* realtime call ([ab7d0b1](https://github.com/rebasedjs/rebasedjs/commit/ab7d0b1644e8eba68546e93d32489521e878e1e3))


### Performance Improvements

* revamp browser platform ([8aa7ed8](https://github.com/rebasedjs/rebasedjs/commit/8aa7ed8e4c9801a2412a81801f38f6c26f384ad2))



## [0.0.11](https://github.com/rebasedjs/rebasedjs/compare/v0.0.10...v0.0.11) (2020-10-19)


### Bug Fixes

* core api interface ([8989239](https://github.com/rebasedjs/rebasedjs/commit/89892398deeb9d7db6c666bf20b4b12a8b20ee08))
* **api:** returned types from verbs ([b5166a0](https://github.com/rebasedjs/rebasedjs/commit/b5166a0cd7ae4b349dbf36054f05acfc3a3cc769))



## [0.0.10](https://github.com/rebasedjs/rebasedjs/compare/v0.0.9...v0.0.10) (2020-10-19)


### Bug Fixes

* **parse:** map Installation collection ([dedd917](https://github.com/rebasedjs/rebasedjs/commit/dedd917c11bdb73c258384aae4725dd53fe4b444))



## [0.0.9](https://github.com/rebasedjs/rebasedjs/compare/v0.0.8...v0.0.9) (2020-10-18)


### Bug Fixes

* parse update should append masterKey and session ([d9a1f92](https://github.com/rebasedjs/rebasedjs/commit/d9a1f92844840d3f5eb1289f5298b4aeb5742dd2))



## [0.0.8](https://github.com/rebasedjs/rebasedjs/compare/v0.0.7...v0.0.8) (2020-10-16)


### Bug Fixes

* parse import ([970e63e](https://github.com/rebasedjs/rebasedjs/commit/970e63e14d5cc266bc35f24c8d9e122a189db70d))



## [0.0.7](https://github.com/rebasedjs/rebasedjs/compare/v0.0.6...v0.0.7) (2020-10-16)


### Bug Fixes

* parse package ([f64aa2f](https://github.com/rebasedjs/rebasedjs/commit/f64aa2f06b2a998ee5a68e241a801530a2cd311d))
* **parse:** expose master chain ([cf4a3f3](https://github.com/rebasedjs/rebasedjs/commit/cf4a3f3339aa739a6a53fa559295fed6cf02eb6d))



## [0.0.6](https://github.com/rebasedjs/rebasedjs/compare/v0.0.5...v0.0.6) (2020-07-18)


### Features

* add parse server ([92bfa98](https://github.com/rebasedjs/rebasedjs/commit/92bfa98a46d2c8fcd9ccc1a578e56e5960b3073e))



## [0.0.5](https://github.com/rebasedjs/rebasedjs/compare/v0.0.4...v0.0.5) (2020-07-16)


### Bug Fixes

* package deps issues ([d19e211](https://github.com/rebasedjs/rebasedjs/commit/d19e21186e7c465b2295c8b1225b9632cb784b11))



## [0.0.4](https://github.com/rebasedjs/rebasedjs/compare/v0.0.3...v0.0.4) (2020-07-16)


### Bug Fixes

* package peer deps ([edffcdb](https://github.com/rebasedjs/rebasedjs/commit/edffcdbee87edb79a7a068a5564b6217931f791a))



## [0.0.3](https://github.com/rebasedjs/rebasedjs/compare/v0.0.2...v0.0.3) (2020-07-15)


### Bug Fixes

* **cache:** expose driverOrder option ([df562f1](https://github.com/rebasedjs/rebasedjs/commit/df562f127c15f7314727edb9d5970453f4147302))
* **core:** add back peerDeps ([2849613](https://github.com/rebasedjs/rebasedjs/commit/2849613be7a643de3efae5d5cf387ec183f34788))



## [0.0.2](https://github.com/rebasedjs/rebasedjs/compare/v0.0.1...v0.0.2) (2020-07-12)


### Bug Fixes

* firebase loader ([f9775b5](https://github.com/rebasedjs/rebasedjs/commit/f9775b5ee42ad8a943f5b481c186fa7d76a9c166))



# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 0.0.1 (2020-07-05)
