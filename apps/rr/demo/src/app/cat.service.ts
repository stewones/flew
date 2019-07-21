import { Injectable } from '@angular/core';
import { Collection, Records } from '@reactive/records';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Response } from '@reactive/records';
import { AxiosRequestConfig } from 'axios';

// import { AxiosRequestConfig } from 'axios';

export interface CatEntry extends Response {
  id: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
@Collection({
  // useCache: false,
  name: 'cats',
  endpoint: '/v1'
})
export class CatService {
  $collection: Records;

  constructor() {
    this.$collection.feed();
    // this.$collection.http((config: AxiosRequestConfig) => {
    //   config.params = { rr: 123 };
    //   config.headers = { 'x-api-key': `${456}` };
    // });
  }

  find(): Observable<CatEntry> {
    return this.$collection.find();
  }

  findOne(): Observable<CatEntry> {
    return this.$collection.findOne();
  }

  findOneAlternative(): Observable<Response<CatEntry>> {
    return this.$collection.findOne();
  }

  findAll(): Observable<Response<CatEntry[]>> {
    return this.$collection.find();
  }
}
