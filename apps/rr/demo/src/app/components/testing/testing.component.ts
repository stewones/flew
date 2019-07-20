
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: '',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestingComponent implements OnInit {

  @Input() entry: any = {};

  constructor(protected detector: ChangeDetectorRef) {}

  ngOnInit() {
   
  }

}