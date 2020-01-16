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
