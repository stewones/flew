//
// platforms
export * from './lib/platforms/browser';
export * from './lib/platforms/server';
export * from './lib/platforms/deprecated';

//
// connectors
export * from './lib/connectors/firebase';
export * from './lib/connectors/firestore';

//
// drivers
export * from './lib/drivers/firestore';

//
// symbols
export * from './lib/symbols/rr';

//
// hooks
export * from './lib/hooks/hooks';

//
// decorators
export * from './lib/decorators/collection';

//
// utils
export * from './lib/utils/store';
export * from './lib/utils/storage';
export * from './lib/utils/version';

//
// interfaces
export { Api } from './lib/interfaces/api';
export { Response } from './lib/interfaces/response';
export { Options } from './lib/interfaces/options';
export { ExtraOptions } from './lib/interfaces/extra-options';
export { Request } from './lib/interfaces/request';
export { Connector } from './lib/interfaces/connector';
export { Hook } from './lib/interfaces/hook';
export { Driver } from './lib/interfaces/driver';
export { StorageAdapter } from './lib/interfaces/storage-adapter';
export { CacheOptions } from './lib/interfaces/cache-options';
export { ClientToken } from './lib/interfaces/client-token';
export { ClientStorage } from './lib/interfaces/client-storage';
export { FirebaseConfig } from './lib/interfaces/firebase-config';
export { Log, LogParams } from './lib/interfaces/log';

// @deprecated
export { RRClientToken } from './lib/interfaces/client-token';
export { RRCacheStorage } from './lib/interfaces/storage-adapter';
export { RRConnector } from './lib/interfaces/connector';
export { RRCacheOptions } from './lib/interfaces/cache-options';
export { RRResponse } from './lib/interfaces/response';
export { RRRequest } from './lib/interfaces/request';
export { RROptions } from './lib/interfaces/options';
export { RRExtraOptions } from './lib/interfaces/extra-options';
export { ElasticMatch } from './lib/interfaces/elastic-match';
export { ElasticQuery } from './lib/interfaces/elastic-query';
export { FirestoreQuery } from './lib/interfaces/firestore-query';

//
// modules  (experimental)
// export * from './lib/modules/angular';
// export * from './lib/symbols/angular'; (experimental)
