import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { Method } from '../../interfaces/method.interface';

@Component({
  selector: 'rr-play-chaining-api',
  templateUrl: './chaining-api.component.html',
  styleUrls: ['./chaining-api.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChainingApiComponent implements OnInit {
  @Input() methods: Method[] = [];
  constructor() {}

  ngOnInit() {}

  removeComments(subject: any) {
    return typeof subject === 'string'
      ? subject.split(`// do whatever with response`).join('')
      : subject;
  }
}
