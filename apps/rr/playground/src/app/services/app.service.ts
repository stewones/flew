import { Injectable } from '@angular/core';
import {
  Collection,
  ReactiveRecord,
  Response
} from '@firetask/reactive-record';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
// import { AxiosRequestConfig } from 'axios';

export interface App extends Response<App> {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
@Collection({
  ...environment.rr,
  name: '',
  endpoint: '/'
})
export class AppService {
  $collection: ReactiveRecord;

  loadCachedResponse$: Subject<void> = new Subject();
  clearCachedResponse$: Subject<void> = new Subject();
  removeAllChainMethods$: Subject<void> = new Subject();

  constructor() {}
}
