//
// platforms
export * from './lib/platforms/browser';
export * from './lib/platforms/server';

//
// connectors
export * from './lib/connectors/firebase';
export * from './lib/connectors/firestore';

//
// drivers
export * from './lib/drivers/firestore';

//
// hooks
export * from './lib/hooks/hooks';

//
// decorators
export * from './lib/decorators/collection';

//
// utils
export * from './lib/utils/version';

//
// interfaces
export { Api } from './lib/interfaces/api';
export { RROptions } from './lib/interfaces/rr-options';
export { RRExtraOptions } from './lib/interfaces/rr-extra-options';
export { RRRequest } from './lib/interfaces/rr-request';
export { RRResponse } from './lib/interfaces/rr-response';
export { Connector } from './lib/interfaces/connector';
export { Hook } from './lib/interfaces/hook';
export { Driver } from './lib/interfaces/driver';
export { StorageAdapter } from './lib/interfaces/storage-adapter';
export { CacheOptions } from './lib/interfaces/cache-options';
export { ClientToken } from './lib/interfaces/client-token';
export { ClientStorage } from './lib/interfaces/client-storage';
export { FirebaseConfig } from './lib/interfaces/firebase-config';

// @deprecated
export { RRClientToken } from './lib/interfaces/client-token';
export { RRCacheStorage } from './lib/interfaces/storage-adapter';
export { RRConnector } from './lib/interfaces/connector';
export { RRCacheOptions } from './lib/interfaces/cache-options';
export { ElasticMatch } from './lib/interfaces/elastic-match';
export { ElasticQuery } from './lib/interfaces/elastic-query';
export { FirestoreQuery } from './lib/interfaces/firestore-query';
