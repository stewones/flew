import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output
} from '@angular/core';
import { EventEmitter } from 'events';
import { Method } from '../../methods.reducer';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'rr-play-chaining-picker',
  templateUrl: './chaining-picker.component.html',
  styleUrls: ['./chaining-picker.component.css']
})
export class ChainingPickerComponent implements OnInit {
  @Input() methods: Method[];
  @Output() onSelect = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
