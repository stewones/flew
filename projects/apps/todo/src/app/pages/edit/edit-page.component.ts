import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { connect, dispatch } from '@rebased/state';
import { navigateTo } from '../../actions/navigateTo';

@Component({
  selector: 'rebased-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPageComponent implements OnInit {
  id: string = this.route.snapshot.params.id;

  loading$ = connect<boolean>('todo.loading');
  error$ = connect<any>('todo.error');

  constructor(protected route: ActivatedRoute) {}

  ngOnInit() {}

  back() {
    dispatch(navigateTo(`/`));
  }
}
