import Parse from 'parse';
import { Rebased } from '@rebased/core';
import { ParseDriver } from '../driver/parse';
import { parse } from './parse';

/**
 * Bootstraps Parse on Rebased
 *
 * @export
 * @param {*} config
 * @param {*} [sdk=Parse]
 * @returns
 */
export function install(config, sdk = Parse) {
  const isDriverAvailable = Rebased.drivers.find(it => it === 'parse');
  if (!isDriverAvailable) {
    Rebased.drivers = [...Rebased.drivers, 'parse'];
  }

  sdk.initialize(config.appID);
  sdk.serverURL = config.serverURL;
  sdk.masterKey = config.masterKey;
  Rebased.driver.parse = new ParseDriver({
    serverURL: sdk.serverURL,
    appID: config.appID,
    instance: sdk.Parse
  });

  return parse();
}
