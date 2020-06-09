import { Component, OnInit } from '@angular/core';
import { collection, Reative, unsubscribe } from '@reative/core';
import { AxiosRequestConfig } from 'axios';
import { take, map } from 'rxjs/operators';
import { resetState } from '@reative/state';
import { resetCache } from '@reative/cache';
import { object } from '@reative/parse';
import moment from 'moment';
@Component({
  selector: 'reative-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'parse-demo';

  ngOnInit() {
    // this.exerciseTest()
    // this.includeTest();
    // this.deleteObjects();
    // this.onQuery();
    // this.setQuery();
    // this.orQueryArraySupport();
    // this.atAfterFirestoreSupport();
    // this.reativeRun();
    // this.configureHttp();
    // this.httpCalls();
    // this.webWorkerPost();
    // this.webWorkerHttp();
    // this.webWorkerParse();
    // this.firebaseTest();
    // this.parseToPromise();
    // this.parseSaveAll();
    // this.disableAutoIdentifier();
    // this.parseQuery();
    // this.parseSet();
    // this.parseFindOne();
  }

  exerciseTest() {
    console.log('start testing');

    //
    // Query example
    collection('Exercise')
      .driver('parse')
      .query({
        or: [
          {
            and: [
              {
                equalTo: () => ['hasProgram', true]
              }
            ]
          },
          {
            and: [
              {
                equalTo: () => ['hasProgram', false]
              }
            ]
          }
        ]
      })
      .count()
      .subscribe(entries => console.log('entries', entries));
  }

  includeTest() {
    collection(`Order`)
      .driver('parse')
      // .include([`parts`, `requester`, `reviewer`])
      .query({
        include: [`parts`, `parts.vendor`, `requester`, `reviewer`],
        equalTo: () => [`code`, `E-100`]
      })

      .findOne()
      //.pipe(map(entries => (entries ? entries[0] : {})))
      .subscribe(order => {
        console.log(`item`, order);
      });
  }

  deleteObjects() {
    //
    // Case 1
    collection(`Order`)
      .driver('parse')
      .query({
        equalTo: () => [`code`, `O-410`]
      })
      .delete()
      .subscribe(result => {
        console.log(`result`, result);
      });

    //
    // Case 2
    const doc_id_or_objectId = `eb40fe2f`;
    collection(`Order`)
      .driver('parse')
      .doc(doc_id_or_objectId)
      .delete()
      .subscribe(result => {
        console.log(`result`, result);
      });
  }

  onQuery() {
    collection(`Part`)
      .driver('parse')
      .key(`realtime-parts`)
      //
      // doesnt work with livequery
      // .query({
      //   or: [
      //     {
      //       equalTo: () => [`doc_id`, `e9f9cacd-4241-943a-74ef-05a1a7bbffd9`]
      //     }
      //   ]
      // })

      .query({
        //
        // works with livequery
        containedIn: () => [
          `doc_id`,
          [`e9f9cacd-4241-943a-74ef-05a1a7bbffd9`, `asdf`]
        ]
      })
      .on()
      .subscribe(parts => {
        console.log(`realtime parts`, parts);
      });

    collection(`Order`)
      .driver('parse')
      .key(`realtime-orders`)
      .query({
        include: [`parts`, `parts.vendor`, `requester`, `reviewer`],
        equalTo: () => [`code`, `E-100`]
      })
      .on()
      .subscribe(orders => {
        console.log(`realtime order`, orders);
      });
  }

  setQuery() {
    collection(`Someone`)
      .driver('parse')
      .set({
        some: 'value'
      })
      .toPromise();
  }

  orQueryArraySupport() {
    const keyword = `stewan`;

    collection(`Vendor`)
      .driver(`parse`)
      .query({
        or: [
          {
            equalTo: [() => ['email', keyword], () => ['phone', keyword]]
          },
          {
            matches: [
              () => ['email', keyword, 'i'],
              () => ['phone', keyword, 'i']
            ]
          }
        ]
      })
      .find()
      .subscribe(console.log);
  }

  async atAfterFirestoreSupport() {
    const limit = 10;

    const firestoreEntries = await collection(`debrief`)
      .driver(`firestore`)
      .sort({ created_at: 'desc' })
      .size(limit)
      .find()
      .toPromise()
      .catch(console.log);

    const firestoreEntries2 = await collection(`debrief`)
      .driver(`firestore`)
      .sort({ created_at: 'asc' })
      .after('2020-01-20')
      .size(limit)
      .find()
      .toPromise()
      .catch(console.log);

    console.log(firestoreEntries[0], firestoreEntries2[0]);
  }

  async reativeRun() {
    // collection(`Todo`)
    //   .driver(`parse`)
    //   .find()
    //   .toPromise()
    //   .then(it => console.log(111, it));

    collection(`Task`)
      .driver(`parse`)
      .key(`collection-run`)
      .run(`collectionRun`, {})
      .toPromise()
      .then(console.log);
  }

  configureHttp() {
    //
    // no worker call
    const coll = collection(`Test`, {
      baseURL: 'https://api.thecatapi.com',
      endpoint: '/v1',
      httpConfig: {
        headers: {
          someHeader: `XYZ`
        }
      }
    });

    coll.http((config: AxiosRequestConfig) => {
      config.headers.xyz = new Date().toISOString();
    });

    coll
      .driver(`http`)
      .state(false)
      .cache(false)
      .save(false)
      .token(`some-Bearer-token`)
      .get(`/images/search`)
      .subscribe(console.log);
  }

  httpCalls() {
    //
    // no worker call
    const coll = collection(`Test`, {
      baseURL: 'https://dev.inf.com',
      endpoint: '/api',
      useWorker: true,
      httpConfig: {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZTkzMzViMDg2NWE5ZTNmNWVhOGRkYzk1NzY5MWFmYjY2NGZkNTI3YzgzNDlkM2UzNTEzZWZmYmZhNzhlOTliYzA1NTViMzc3NmI1ZWFhNjciLCJpYXQiOjE1ODA3NTE0OTUsIm5iZiI6MTU4MDc1MTQ5NSwiZXhwIjoxNjEyMzczODk0LCJzdWIiOiI0NDE1Iiwic2NvcGVzIjpbIioiXX0.FF78hzNFUDGAPxxVxJlw_xtcXY3lGMloOkzIohShzaz1KtPJE0jY7uusxDo5rRWwpe0IyAQdclDVScNcf8D7Ks_D_16WvwsQFDh7c3IGybEW2zUgb6gA-A8gbqcN_BNG-2xGB_d3R3KsyhJwBjXcQG_W9FY1T5fCMNd3pUD5bda5AxyhkOdzLR6plWKQ3bBPKAQZX9R8xqXp0UU9DQzizBS5_8IrqfvrGc_rK5d4fT_yN-F8Lg4-zRej2rjo9g99qxMyAgSkMZzUkRUptOEYNbPqq4vFxU-HSFAziL1DQwgnE0qxuc8kbdlIqkA6RBJZ-KTTITdbnwa-CkC9Wo76zdWvpDH9DJXoOLC8tV-dbWOpNd31skF2AcueAwEeSJ4PRS6IzODuwV3VLStfnIxpfohDU1IN2vPh-XVFMtnjlcdaXBk0otEYqWuw1ieN--TGRubHVqdrdGmUfwPaiDdv7R3dRbIfNgT7WyXDsLZ3DSXntmaC_g1enWu1EIL4B2kGUv7kV9iRomhLtdxNoln-_k_cBLWsgv_AGmPp9l0T96fZtX7QYpk_6yIQPEX6M0-uKv5UP-r3dV5hqc8PvhAOSae4_IAtNzlB8rePgQQbYPHYpo1DYwR8Q69_6uB1ZOCKyxmdyAowSRmpexBujA9MfMPE6C7dLLl4Ac75gXkoG8g`
        }
      }
    });

    coll
      .state(false)
      .cache(false)
      .save(false)
      .get(`/user/profile`)
      .subscribe(console.log);
  }

  webWorkerPost() {
    const coll = collection(`Test`, {
      baseURL: 'https://dev.com',
      endpoint: '/api',
      useWorker: true
    });

    coll
      .state(false)
      .cache(false)
      .save(false)
      .post(`/login`, {
        client_id: 1,
        client_secret: '8SGp6dUo5cKtOP8uueKKgKvKSBZ96Uuq54O7V4kj',
        email: '',
        password: ''
      })
      .subscribe(
        it => console.log(`it`, it),
        err => console.log(`err`, err)
      );
  }

  webWorkerHttp() {
    //
    // worker call
    for (let i = 0; i < 3; i++)
      collection(`Worker`, {
        baseURL: 'https://api.thecatapi.com',
        endpoint: '/v1',
        useWorker: true // GLOBAL WORKER
      })
        .driver(`http`)
        .state(false)
        .cache(false)
        .save(false)
        .raw(true)
        //.worker(true) // CHAINABLE WORKER
        .token(`some-Bearer-token-${i}`)
        .get(`/images/search?asdf=${i}`)
        .pipe(map((it: any) => it.data[0]))
        .subscribe(r => console.log(`worker response`, r), console.log);

    //
    // worker failed call
    collection(`Worker`, {
      baseURL: 'https://api.thecatapi.com',
      endpoint: '/v1',
      useWorker: true // GLOBAL WORKER
    })
      .driver(`http`)
      .state(false)
      .cache(false)
      .save(false)
      .get(`/images/asdf`)
      .pipe(map((it: any) => it.data[0]))
      .toPromise()
      .catch(err => console.log(`failed call + toPromise`, err));

    //
    // non-worker call
    for (let i = 0; i < 3; i++)
      collection(`Test`, {
        baseURL: 'https://api.thecatapi.com',
        endpoint: '/v1',
        httpConfig: {
          headers: {
            someHeader: `XYZ`
          }
        }
      })
        .driver(`http`)
        .state(false)
        .cache(false)
        .save(false)
        .raw(true)
        .token(`some-Bearer-token`)
        .http((config: AxiosRequestConfig) => {
          config.headers.xyz = 123;
          // console.log(111, config.headers);
        })
        .get(`/images/search`)
        .pipe(map((it: any) => it.data[0]))
        .subscribe(
          r => console.log(`non-worker response`, r),
          console.log
          //   () => console.log(`completed`)
        );
  }

  webWorkerParse() {
    //
    // worker call
    for (let i = 0; i < 3; i++)
      collection(`Order`, {
        useWorker: true // GLOBAL WORKER
      })
        .key(`order-worker-${i}`)
        .driver(`parse`)
        .state(false)
        .cache(false)
        .save(false)
        .size(1)
        .raw(true)
        //.worker(true) // CHAINABLE WORKER
        .findOne()
        //        .subscribe(r => console.log(`worker response`, Reative.responses, r));
        .toPromise()
        .then(r => console.log(`worker response`, r));

    //
    // failed call
    collection(`User`, {
      useWorker: true // GLOBAL WORKER
    })
      .key(`order-worker-fail`)
      .driver(`parse`)
      .query({
        equalTo: { a: '123' }
      })
      .state(false)
      .cache(false)
      .save(false)
      .size(1)
      .findOne()
      .toPromise()
      .then(r => console.log(r))
      .catch(err => console.log(`failed call + toPromise()`, err));

    //
    // non-worker call
    for (let i = 0; i < 3; i++)
      collection(`Order`)
        .key(`order-non-worker-${i}`)
        .driver(`parse`)
        .state(false)
        .cache(false)
        .save(false)
        .raw(true)
        .findOne()
        .subscribe(r => console.log(`non-worker response`, r));
  }

  firebaseTest() {
    for (let i = 0; i < 3; i++)
      collection(`cats`)
        .driver(`firebase`)
        .state(false)
        .cache(false)
        .save(false)
        .raw(true)
        .find()
        .subscribe(
          r => console.log(`success firebase`, r),
          err => console.log(`err firebase`, err)
        );

    for (let i = 0; i < 3; i++)
      collection(`cats`)
        .driver(`firestore`)
        .state(false)
        .cache(false)
        .save(false)
        .raw(true)
        .find()
        .subscribe(
          r => console.log(`success firestore`, r),
          err => console.log(`err firestore`, err)
        );
  }

  async parseToPromise() {
    const fn = function(name = 'Birmingham') {
      return (
        collection(`Company`)
          .driver(`parse`)
          // .state(false)
          // .cache(false)
          // .save(false)
          .raw(false)
          // .where(`name`, `==`, name)
          .findOne()
      );
    };
    console.log(`trying`);
    await fn()
      .toPromise()
      .then(console.log);
    console.log(`parseToPromise done`);
  }

  parseSaveAll() {
    collection(`Activity`)
      .driver(`parse`)
      .master(true) // this is just for test. we dont use master key on client side
      .set(
        [
          object(`Activity`, { message: 'oi 1' }),
          object(`Activity`, { message: 'oi 2' })
        ],
        { all: true }
      )
      .subscribe(
        r => console.log(`success`, r),
        err => console.log(`err`, err)
      );
  }

  disableAutoIdentifier() {
    collection(`Activity`, {
      disableTimestamp: true,
      // timestampObject: true,
      disableAutoID: true
    })
      .driver(`parse`)
      .set({ message: 'oi 3' })
      .subscribe(
        r => console.log(`success`, r),
        err => console.log(`err`, err)
      );
  }

  parseQuery() {
    // collection(`User`)
    //   .driver(`parse`)
    //   .query({
    //     greaterThanOrEqualTo: () => [
    //       'online_at',
    //       moment()
    //         .subtract(1, 'hour')
    //         .toISOString()
    //     ],
    //     lessThan: () => ['online_at', moment().toISOString()]
    //   })
    //   .find()
    //   .subscribe(console.log);

    collection(`Debrief`)
      .driver(`parse`)
      .sort({ job_number: 'desc', created_at: 'desc' })
      .query({
        or: [
          {
            equalTo: () => [`customer_name`, `apple`]
          },
          {
            matches: () => [`customer_name`, `apple`, `i`]
          }
        ]
      })

      .size(100)
      .find<any[]>()
      //    .pipe(take(1))
      .subscribe(entries => {
        console.log(entries);
      });
  }

  clearState() {
    resetState();
  }

  clearCache() {
    resetCache();
  }

  realtimeUnsubscribe() {
    unsubscribe(`realtime-orders`);

    collection(`Order`)
      .driver('parse')
      .key(`realtime-orders`)
      .query({
        include: [`parts`, `parts.vendor`, `requester`, `reviewer`],
        equalTo: () => [`code`, `E-100`]
      })
      .on()
      .subscribe(orders => {
        console.log(`realtime order`, orders);
      });
  }

  parseSet() {
    collection(`Customer`)
      .driver('parse')
      .set({
        name: 'asffa'
      })
      .toPromise()
      .catch(console.log)
      .then(console.log);
  }

  parseSelect() {
    collection(`Customer`)
      .driver('parse')
      .select(['name'])
      .find()
      .toPromise()
      .catch(console.log)
      .then(console.log);
  }

  async parseDelete() {
    const item: any = await collection(`Todo`)
      .driver('parse')
      .set({
        text: 'hey'
      })
      .toPromise();

    collection(`Todo`)
      .driver('parse')
      .doc(item.id)
      .delete()
      .toPromise()
      .then(() => console.log('success'))
      .catch(err => console.log(err));
  }

  async parseFindOne() {
    collection(`Todo`)
      .driver('parse')
      .where(`doc_id`, `==`, `lol`)
      .findOne()
      .subscribe(it => console.log(`is empty`, it));
  }

  parseRealtimeTodo() {
    unsubscribe(`realtime-todos`); // <-- this is important to not get snowballed
    collection(`Todo`)
      .driver('parse')
      .key(`realtime-todos`)
      .where(`doc_id`, `==`, `9fc04dcd92b3`)
      .memo(false)
      .cache(false)
      .on()
      .subscribe(todos => {
        console.log(`realtime todos`, todos);
      });

    unsubscribe(`realtime-users`); // <-- this is important to not get snowballed
    collection(`User`)
      .driver('parse')
      .key(`realtime-users`)
      .where(`username`, `==`, `eu`)
      .memo(false)
      .cache(false)
      .on()
      .subscribe(users => {
        console.log(`realtime users`, users);
      });
  }

  parseAggregate() {
    collection(`Debrief`)
      .driver(`parse`)
      .key(`parse-agg`)
      .run('aggregate', {
        collection: `Debrief`,
        query: {
          aggregate: {
            match: {
              _p_company: 'Company$Vh5hrUTUnG',
              created_at: {
                $gte: '2020-04-23T03:29:31.203Z',
                $lt: '2020-05-23T03:29:31.203Z'
              }
            },
            group: {
              objectId: {
                year: { $substr: ['$created_at', 0, 4] },
                month: { $substr: ['$created_at', 5, 2] },
                day: { $substr: ['$created_at', 8, 2] }
              },
              count: { $sum: 1 },
              created: { $first: '$created_at' }
            },
            sort: { created: 1 }
          }
        }
      })
      .subscribe(
        (response: any[]) => {
          console.log(response);
        },
        err => console.log(err)
      );
  }

  realtimeDatabase() {
    collection('any')
      //.key('')
      .driver('firebase')
      .cache(false)
      .memo(false)
      .ref('some/deep/value')
      .on()
      .subscribe(it => console.log(it));
  }

  parseResponseOrder() {
    collection('Todo')
      .key('parse-response-order')
      .driver('parse')
      .find()
      .subscribe(it => console.log(it));
  }
}
