import { Observable } from 'rxjs';
import { ExtraOptions } from './extra-options';
import { Response } from './response';
import { Request } from './request';
import { Connector } from './connector';

export interface Driver {
  connector: Connector;
  timestamp: boolean;
  find: (
    request: Request,
    extraOptions?: ExtraOptions
  ) => Observable<Response>;
  findOne: (
    request: Request,
    extraOptions?: ExtraOptions
  ) => Observable<Response>;
  set: (id: string, data: any) => Observable<Response>;
  update: (id: string, data: any) => Observable<Response>;
  on?: (
    request: Request,
    onSuccess: (response: Response | any) => any,
    onError: (response: any) => any,
    extraOptions?: ExtraOptions
  ) => any;
}
