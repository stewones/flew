import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { fetch } from '@flew/network';
import { pointer } from '@flew/parse';
import Parse from 'parse/dist/parse.min.js';
import { lastValueFrom } from 'rxjs';

Parse.initialize('IntenseplusServer');
Parse.serverURL = 'http://localhost:1337/parse';

@Component({
  selector: 'flew-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent implements OnInit {
  parseMatchesQueryResult: any;
  flewMatchesQueryResult: any;
  flewSortQueryResult: any;

  async ngOnInit() {}

  parseMatchesQuery() {
    const orgQuery = new Parse.Query<Parse.Object<any>>('Org');
    orgQuery.matches('name', 'Intense', 'i');

    const query = new Parse.Query<Parse.Object<any>>('OrgUser');
    query.matchesQuery('org', orgQuery);

    query
      .find()
      .then(result =>
        result.map(it => (this.parseMatchesQueryResult = it.toJSON())),
      );
  }

  flewMatchesQuery() {
    lastValueFrom(
      fetch('OrgUser')
        .query({
          and: [
            {
              equalTo: () => ['org', pointer('Org', 'ZmUCiiuAfU')],
            },
            {
              matchesQuery: () => [
                'org',
                'Org',
                [
                  {
                    matches: () => ['name', 'intense', 'i'],
                  },
                ],
              ],
            },
          ],
        })
        .find(),
    ).then(result => (this.flewMatchesQueryResult = result));
  }

  flewSortQuery() {
    lastValueFrom(
      fetch('OrgUser')
        .where('org', '==', pointer('Org', 'FLXfiqHDGB'))
        .sort({
          userEmail: 'asc',
          userName: 'asc',
        })
        .find(),
    ).then(result => (this.flewSortQueryResult = result));
  }
}
