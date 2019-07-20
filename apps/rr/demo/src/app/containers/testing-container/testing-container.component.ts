
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { Observable } from 'rxjs';
import { select } from '@firetask/state';

@Component({
  selector: '',
  templateUrl: './testing-container.component.html',
  styleUrls: ['./testing-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestingContainerComponent implements OnInit {

  entries$: Observable<any[]>;

  constructor(protected detector: ChangeDetectorRef) {}

  ngOnInit() {
    this.entries$ = select('entries');
  }

}