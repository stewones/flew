import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output
} from '@angular/core';
import { EventEmitter } from 'events';
import { Method, MethodState } from '../../methods.reducer';
import { Store } from '@ngrx/store';
import { MethodsActionTypes, AddMethod } from '../../methods.actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'rr-play-chaining-picker',
  templateUrl: './chaining-picker.component.html',
  styleUrls: ['./chaining-picker.component.css']
})
export class ChainingPickerComponent implements OnInit {
  @Input() methods: Method[];
  @Output() onSelect = new EventEmitter();

  constructor(private store: Store<MethodState>) {}

  ngOnInit() {}

  addMethod(payload: Method) {
    this.store.dispatch(new AddMethod(payload));
  }
}
