# Records

**Reative Records** _\(RR\)_ allows you to build your app fast with a lot of fun. Its concept is based on _Reactive_ _Programming_ but it doesn't mean you're going to be stuck on _redux patterns_. You can work with using _Observables, Promises_ or even its [built-in Store](https://docs.reative.dev/state) powered by _NGXS_. Every _verb_ call returns an _Observable_ which means you can do anything. The chaining api is clear and **easy to remind**. Besides unit tests _RR_ is also tested across multiple apps before each release.

The lib is available on both client/server side. However in browser it has a lot of cool features such as the cache and state management. You can implement on top of old but gold _vanilla.js_ or simply take advantage of typescript to level up your code integrity/quality, while reduce the boilerplate. So that's a big win.

Last but not least, this package is intended to be totally _framework agnostic_, meaning you should be able to use it outside Angular with your preferred framework.

The other packages are all Angular related, though you can easily write your own adapters implementing the [Reative Protocol](https://github.com/stewwan/reative/blob/master/libs/records/src/lib/symbols/reative.ts#L6).

