
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { Observable } from 'rxjs';
import { select } from '@reative/state';

@Component({
  selector: 'contained-in-page',
  templateUrl: './contained-in-page.component.html',
  styleUrls: ['./contained-in-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainedInPageComponent implements OnInit {

  entries$: Observable<any[]>;

  constructor(protected detector: ChangeDetectorRef) {}

  ngOnInit() {
    this.entries$ = select('entries');
  }

}