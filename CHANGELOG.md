# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.2.1](https://github.com/stewwan/reative/compare/v1.1.0...v1.2.1) (2019-09-13)


### Bug Fixes

* upgrade firebase and remove ionic from cache module ([62edbf6](https://github.com/stewwan/reative/commit/62edbf6))
* **browser:** replace `super` calls with `this` ([92d469a](https://github.com/stewwan/reative/commit/92d469a))
* **rr:** store and browser support for ttl ([77ecf43](https://github.com/stewwan/reative/commit/77ecf43))
* **store:** cant import storage from here ([51c18bf](https://github.com/stewwan/reative/commit/51c18bf))


### Features

* **firestore:** add `at` and `after` to api ([00b1723](https://github.com/stewwan/reative/commit/00b1723))
* **rr:** export diff function ([d520fa2](https://github.com/stewwan/reative/commit/d520fa2))
* **state:** make feedState also accept a key ([246e5fb](https://github.com/stewwan/reative/commit/246e5fb))
* **state:** make getState also return from cache if needed ([1009945](https://github.com/stewwan/reative/commit/1009945))

## [1.2.0](https://github.com/stewwan/reative/compare/v1.1.0...v1.2.0) (2019-09-03)


### Bug Fixes

* upgrade firebase and remove ionic from cache module ([62edbf6](https://github.com/stewwan/reative/commit/62edbf6))
* **browser:** replace `super` calls with `this` ([92d469a](https://github.com/stewwan/reative/commit/92d469a))
* **rr:** store and browser support for ttl ([77ecf43](https://github.com/stewwan/reative/commit/77ecf43))
* **store:** cant import storage from here ([51c18bf](https://github.com/stewwan/reative/commit/51c18bf))


### Features

* **firestore:** add `at` and `after` to api ([00b1723](https://github.com/stewwan/reative/commit/00b1723))
* **rr:** export diff function ([d520fa2](https://github.com/stewwan/reative/commit/d520fa2))
* **state:** make getState also return from cache if needed ([1009945](https://github.com/stewwan/reative/commit/1009945))

### [1.1.2](https://github.com/stewwan/reative/compare/v1.1.0...v1.1.2) (2019-08-30)


### Bug Fixes

* upgrade firebase and remove ionic from cache module ([62edbf6](https://github.com/stewwan/reative/commit/62edbf6))
* **browser:** replace `super` calls with `this` ([92d469a](https://github.com/stewwan/reative/commit/92d469a))
* **rr:** store and browser support for ttl ([77ecf43](https://github.com/stewwan/reative/commit/77ecf43))

### [1.1.1](https://github.com/stewwan/reative/compare/v1.1.0...v1.1.1) (2019-08-01)


### Bug Fixes

* upgrade firebase and remove ionic from cache module ([62edbf6](https://github.com/stewwan/reative/commit/62edbf6))



## [1.1.0](https://github.com/stewwan/reative/compare/v1.0.7...v1.1.0) (2019-08-01)

### Features

- **state:** rework of how records are being persisted on state. now it should assume a top level object on state, rather than live in a single array index. ([6c3719b](https://github.com/stewwan/reative/commit/6c3719b))

### [1.0.11](https://github.com/stewwan/reative/compare/v1.0.7...v1.0.11) (2019-08-01)

### Bug Fixes

- **state:** make sure key is being set ([af6fcfd](https://github.com/stewwan/reative/commit/af6fcfd))

### [1.0.10](https://github.com/stewwan/reative/compare/v1.0.7...v1.0.10) (2019-07-31)

### Bug Fixes

- **state:** make setState update an existing result without moving its position ([b6e9280](https://github.com/stewwan/reative/commit/b6e9280))

### [1.0.9](https://github.com/stewwan/reative/compare/v1.0.7...v1.0.9) (2019-07-31)

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
- Replace `reactive-record` to `records`
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
- **state:** store was duplicating records ([3249049](https://github.com/stewwan/reative/commit/3249049))
- **store:** again, make data param default to true for key method ([19ca350](https://github.com/stewwan/reative/commit/19ca350))
- closes [#14](https://github.com/stewwan/reative/issues/14) ([9a200fa](https://github.com/stewwan/reative/commit/9a200fa))

### Features

- **rr:** add isOnline method and fix diff strategy ([0a4450d](https://github.com/stewwan/reative/commit/0a4450d))
- **state:** merge elastic response detection ([0eae9a3](https://github.com/stewwan/reative/commit/0eae9a3))
- **store:** make data param default to true ([00ee431](https://github.com/stewwan/reative/commit/00ee431))
- **storybook:** add storysource plugin ([376dd65](https://github.com/stewwan/reative/commit/376dd65))

### [0.2.12](https://github.com/stewwan/reative/compare/v0.2.11...v0.2.12) (2019-07-15)

### Bug Fixes

- **state:** store was duplicating records ([3249049](https://github.com/stewwan/reative/commit/3249049))

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
