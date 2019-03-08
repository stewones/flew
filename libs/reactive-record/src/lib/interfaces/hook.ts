import { AxiosRequestConfig } from 'axios';
import { PartialObserver } from 'rxjs';
import { ExtraOptions } from './extra-options';
import { Response } from './response';

/**
 * @export
 * @interface Hook
 */
export interface Hook {
  http?: {
    pre?: (config: AxiosRequestConfig) => void;
    get?: {
      before?: (
        key: string,
        observer: PartialObserver<Response>,
        ExtraOptions?: ExtraOptions
      ) => Promise<boolean>;
      after?: (
        key: string,
        response: Response & { ttl: number },
        observer: PartialObserver<Response>,
        ExtraOptions?: ExtraOptions
      ) => any;
    };
    post?: {
      before?: (
        key: string,
        observer: PartialObserver<Response>,
        ExtraOptions?: ExtraOptions
      ) => Promise<boolean>;
      after?: (
        key: string,
        response: Response & { ttl: number },
        observer: PartialObserver<Response>,
        ExtraOptions?: ExtraOptions
      ) => any;
    };
    patch?: {
      before?: (
        key: string,
        observer: PartialObserver<Response>,
        ExtraOptions?: ExtraOptions
      ) => Promise<boolean>;
      after?: (
        key: string,
        response: Response & { ttl: number },
        observer: PartialObserver<Response>,
        ExtraOptions?: ExtraOptions
      ) => any;
    };
  };
  find?: {
    before?: (
      key: string,
      observer: PartialObserver<Response>,
      ExtraOptions?: ExtraOptions
    ) => Promise<boolean>;
    after?: (
      key: string,
      response: Response & { ttl: number },
      observer: PartialObserver<Response>,
      ExtraOptions?: ExtraOptions
    ) => any;
    endpoint?: () => string;
  };
  // @deprecated
  exception?: {
    server?: () => any;
    client?: () => any;
  };
}
