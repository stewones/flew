
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { Observable } from 'rxjs';
import { select } from '@reative/state';

@Component({
  selector: 'less-than-or-equal-to-page',
  templateUrl: './less-than-or-equal-to-page.component.html',
  styleUrls: ['./less-than-or-equal-to-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LessThanOrEqualToPageComponent implements OnInit {

  entries$: Observable<any[]>;

  constructor(protected detector: ChangeDetectorRef) {}

  ngOnInit() {
    this.entries$ = select('entries');
  }

}