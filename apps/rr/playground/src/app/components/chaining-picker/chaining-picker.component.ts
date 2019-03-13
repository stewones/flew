import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import { EventEmitter } from 'events';
import { Store } from '@ngrx/store';
import { AddMethod } from '../../+play/play.actions';
import { Method } from '../../interfaces/method.interface';
import { PlayState } from '../../+play/play.reducer';
import { FieldCallbackComponent } from '../form/field-callback/field-callback.component';
import { FieldBooleanComponent } from '../form/field-boolean/field-boolean.component';

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
