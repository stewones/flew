
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { Observable } from 'rxjs';
import { select } from '@reative/state';

@Component({
  selector: 'equal-to-page',
  templateUrl: './equal-to-page.component.html',
  styleUrls: ['./equal-to-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EqualToPageComponent implements OnInit {

  entries$: Observable<any[]>;

  constructor(protected detector: ChangeDetectorRef) {}

  ngOnInit() {
    this.entries$ = select('entries');
  }

}