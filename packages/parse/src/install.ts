import Parse from 'parse';
import { namespace } from '@flew/core';
import { parse, ParseDriver } from '.';

const workspace = namespace();
export interface ParseOptions {
  serverURL: string;
  appID: string;
  masterKey?: string;
}
/**
 * Bootstraps Parse on Flew
 *
 * @export
 * @param {*} config
 * @param {*} [sdk=Parse]
 * @returns {Parse} Parse instance configured
 */
export function installParse(config: ParseOptions, sdk = Parse) {
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

  return parse();
}
