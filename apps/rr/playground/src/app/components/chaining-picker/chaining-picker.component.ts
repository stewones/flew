import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output
} from '@angular/core';
import { EventEmitter } from 'events';
import { Store } from '@ngrx/store';
import { AddMethod } from '../../+play/play.actions';
import { Method } from '../../interfaces/method.interface';
import { PlayState } from '../../+play/play.reducer';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'rr-play-chaining-picker',
  templateUrl: './chaining-picker.component.html',
  styleUrls: ['./chaining-picker.component.css']
})
export class ChainingPickerComponent implements OnInit {
  @Input() methods: Method[];
  @Output() onSelect = new EventEmitter();

  constructor(private store: Store<PlayState>) {}

  ngOnInit() {}

  addMethod(payload: Method) {
    this.store.dispatch(new AddMethod(payload));
  }
}
