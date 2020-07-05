import { Storage } from '@ionic/storage';
import { install } from './install';
import { storageConfig } from './storageConfig';

export const cacheLoader = {
  install,
  storageConfig,
  Storage
};
