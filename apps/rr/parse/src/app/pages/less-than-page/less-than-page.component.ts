
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { Observable } from 'rxjs';
import { select } from '@reative/state';

@Component({
  selector: 'less-than-page',
  templateUrl: './less-than-page.component.html',
  styleUrls: ['./less-than-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LessThanPageComponent implements OnInit {

  entries$: Observable<any[]>;

  constructor(protected detector: ChangeDetectorRef) {}

  ngOnInit() {
    this.entries$ = select('entries');
  }

}