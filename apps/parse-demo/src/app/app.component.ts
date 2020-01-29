import { Component, OnInit } from '@angular/core';
import { collection } from '@reative/core';

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
    this.reativeRun();
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
}
