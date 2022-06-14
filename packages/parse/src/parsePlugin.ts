import Parse from 'parse/dist/parse.js';

import { namespace } from '@flew/core';
import { ParseDriver } from './driver';
import { ParseOptions } from './structure';

const workspace = namespace();

export function parsePlugin(config: ParseOptions, sdk = Parse) {
  return () => {
    const isDriverAvailable = workspace.drivers.find(it => it === 'parse');
    if (!isDriverAvailable) {
      workspace.drivers = [...workspace.drivers, 'parse'];
    }

    sdk.initialize(config.appID);
    sdk.serverURL = config.serverURL;
    sdk.masterKey = config.masterKey;

    workspace.driver.parse = new ParseDriver({
      serverURL: sdk.serverURL,
      appID: config.appID,
      instance: sdk.Parse,
    });
  };
}
