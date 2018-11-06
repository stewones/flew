//
// lib
export * from './lib/reactive-record';

//
// connectors
export * from './lib/connectors/firebase';
export * from './lib/connectors/firestore';

//
// plugins
export * from './lib/plugins/cache';

//
// drivers
export * from './lib/drivers/firestore';

//
// hooks
export * from './lib/hooks/hooks';

//
// interfaces
export { RRApi } from './lib/interfaces/rr-api';
export { RROptions } from './lib/interfaces/rr-options';
export { RRResponse } from './lib/interfaces/rr-response';
export { RRConnector } from './lib/interfaces/rr-connector';
export { RRHook } from './lib/interfaces/rr-hook';
export { RRRequest } from './lib/interfaces/rr-request';
export { RRDriver } from './lib/interfaces/rr-driver';
export { RRExtraOptions } from './lib/interfaces/rr-extra-options';
export { RRClientOptions } from './lib/interfaces/rr-client-options';     
export { RRClientStorage } from './lib/interfaces/rr-client-storage';                
export { RRClientToken } from './lib/interfaces/rr-client-token';                    

export { ElasticMatch } from './lib/interfaces/elastic-match';
export { ElasticQuery } from './lib/interfaces/elastic-query';
export { FirebaseConfig } from './lib/interfaces/firebase-config';
export { FirestoreQuery } from './lib/interfaces/firestore-query';


// @deprecated
export { ExtraOptions } from './lib/interfaces/extra-options';                 
export { ClientSetupOptions } from './lib/interfaces/client-setup-options';     
export { ClientStorage } from './lib/interfaces/client-storage';                
export { ClientToken } from './lib/interfaces/client-token';    