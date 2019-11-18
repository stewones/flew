
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { Observable } from 'rxjs';
import { select } from '@reative/state';

@Component({
  selector: 'greater-than-or-equal-to-page',
  templateUrl: './greater-than-or-equal-to-page.component.html',
  styleUrls: ['./greater-than-or-equal-to-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GreaterThanOrEqualToPageComponent implements OnInit {

  entries$: Observable<any[]>;

  constructor(protected detector: ChangeDetectorRef) {}

  ngOnInit() {
    this.entries$ = select('entries');
  }

}