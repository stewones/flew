import { Component, OnInit } from '@angular/core';
import { collection, Reative } from '@reative/core';
import { AxiosRequestConfig } from 'axios';
import { take, map } from 'rxjs/operators';

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
    this.webWorker();
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
    collection(`Debrief`)
      .driver(`parse`)
      .key(`debrief-report`)
      .run(`debriefReport`, {
        company: '2BrFT6OrBm',
        picker: {
          startDate: '2019-01-01',
          endDate: '2019-12-31'
        }
      })
      .toPromise()
      .then(console.log);
  }

  webWorker() {
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
        .subscribe(r => console.log(`worker response`, Reative.responses, r));
    // @todo worker and toPromise dont work good
    // .toPromise()
    // .then(r => console.log(`worker response`, r));

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
      .subscribe(it => console.log(`it`, it), err => console.log(`err`, err));
  }
}
