import { Injectable } from '@angular/core';
import {
  Collection,
  Records,
  Response
} from '@reative/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

export interface App extends Response<App> {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
@Collection({
  name: '',
  endpoint: '/'
})
export class AppService {
  $collection: Records; // just 4 fun

  loadCache$: Subject<void> = new Subject();
  clearCache$: Subject<void> = new Subject();
  clearChain$: Subject<void> = new Subject();

  constructor() {}
}
