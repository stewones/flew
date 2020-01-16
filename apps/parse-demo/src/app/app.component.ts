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
    //this.exerciseTest()
    this.includeTest();
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
}
