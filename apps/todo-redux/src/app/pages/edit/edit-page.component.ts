import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { Observable } from 'rxjs';
import { select, dispatch } from '@reative/state';
import { navigateTo } from '../../actions/navigateTo';

@Component({
  selector: 'edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPageComponent implements OnInit {
  entries$: Observable<any[]>;

  constructor(protected detector: ChangeDetectorRef) {}

  ngOnInit() {
    this.entries$ = select('entries');
  }

  back() {
    dispatch(navigateTo(`/`));
  }
}
