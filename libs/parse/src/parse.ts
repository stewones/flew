import { Reative } from '@reative/core';

export interface ParseOptions {
  serverURL: string;
  appID: string;
  masterKey?: string;
}

export function model(name: string) {
  const Entity = Reative.Parse.Object.extend(name);
  return new Entity();
}

export function query(name: string) {
  return new Reative.Parse.Query(name);
}

export function pointer(name: string, id: string) {
  const mapping = {
    User: '_User',
    Role: '_Role',
    Session: '_Session'
  };
  return new Reative.Parse.Object(mapping[name] ? mapping[name] : name).set(
    'id',
    id
  );
}

export function object(collection: string, attr = {}, options = {}) {
  return new Reative.Parse.Object(collection, attr, options);
}

export function parse() {
  return Reative.Parse;
}

export function install(instance, options) {
  instance.initialize(options.appID);
  instance.serverURL = options.serverURL;
  instance.masterKey = options.masterKey;
  Reative.Parse = instance;
}
