import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';
import { select, dispatch } from '@reative/state';
import { navigateTo } from '../../actions/navigateTo';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'reative-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPageComponent implements OnInit {
  id: string = this.route.snapshot.params.id;
  constructor(protected route: ActivatedRoute) {}

  ngOnInit() {}

  back() {
    dispatch(navigateTo(`/`));
  }
}
