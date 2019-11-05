
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { Observable } from 'rxjs';
import { select } from '@reative/state';

@Component({
  selector: 'greater-than-page',
  templateUrl: './greater-than-page.component.html',
  styleUrls: ['./greater-than-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GreaterThanPageComponent implements OnInit {

  entries$: Observable<any[]>;

  constructor(protected detector: ChangeDetectorRef) {}

  ngOnInit() {
    this.entries$ = select('entries');
  }

}