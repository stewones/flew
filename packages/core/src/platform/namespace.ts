import { FlewProtocol } from '../structure/protocol';
import { Flew } from './flew';

if (!globalThis['__flew__']) {
  globalThis['__flew__'] = Flew;
}

export function namespace(): FlewProtocol {
  return globalThis['__flew__'];
}
