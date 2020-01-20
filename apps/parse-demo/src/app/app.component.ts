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
        matches: () => [`code`, `O-410`]
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
}
