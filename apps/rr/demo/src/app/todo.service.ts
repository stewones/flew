import { Injectable } from '@angular/core';
import {
  Collection,
  ReactiveRecord,
  Response,
  Config
} from '@firetask/reactive-record';
import { Observable } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import { UserService } from './user.service';

export interface TodoEntry extends Response {
  id: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
@Collection({
  // useCache: false,
  name: 'todos',
  endpoint: '/v1'
})
export class TodoService {
  $collection: ReactiveRecord;
  token: string = 'd0c108d0-2568-4373-84f2-c7de7e7a18b4';
  rr = 'rulez!';

  constructor(private user: UserService) {
    this.$collection.feed(); // feed store with cached response
    this.$collection.http((config: AxiosRequestConfig) => {
      config.params = { rr: this.rr };
      config.headers = { 'x-api-key': `${this.token}` };
    });

    //
    // async http config test
    //
    // setTimeout(() => {
    //   this.token = 'a1b2c3d4';
    //   this.rr = 'rox!';
    // }, 5000);

    //
    // reboot test
    //
    // setTimeout(() => {
    //   console.log('reboot');
    //   Reactive.options.useLog = false;
    //   this.$collection.reboot();
    // }, 5000);
  }

  // doesnt work for now =(
  // beforeHttp(config: AxiosRequestConfig) {
  //   console.log('YAY');
  //   config.params = { rr: this.rr };
  //   config.headers = { Authorization: `Bearer ${this.token}` };
  // }

  getCat(): Observable<TodoEntry> {
    return this.$collection
      .transformNetwork((r: Response) => r.data)
      .key('baby')
      .get<TodoEntry>('/images/search');
  }

  postCat(): Observable<TodoEntry> {
    return this.$collection
      .transformNetwork((r: Response) => r.data)
      .useCache(false)
      .saveNetwork(false)
      .post('/votes', { image_id: 'birm', value: 1 });
  }

  // findAll(): Observable<Response<TodoEntry>> {
  //   return this.$collection.find<TodoEntry>();
  // }

  // findAll_(): Observable<Response<TodoEntry[]>> {
  //   return this.$collection
  //     .transformNetwork((r: Response) => r.data)
  //     .get<Response<TodoEntry[]>>('/images/search');
  // }

  // findOneLegacy(): Observable<TodoEntry> {
  //   return <any>(
  //     this.$collection.transformNetwork(r => r.data).get('/images/search')
  //   );
  // }

  // findOneSimple(): Observable<TodoEntry> {
  //   return this.$collection
  //     .transformNetwork((r: Response) => r.data)
  //     .get('/images/search');
  // }
}
