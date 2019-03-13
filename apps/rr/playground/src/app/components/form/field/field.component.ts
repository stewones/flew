import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  Input
} from '@angular/core';
import { FieldBooleanComponent } from '../field-boolean/field-boolean.component';
import { FieldCallbackComponent } from '../field-callback/field-callback.component';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { FormField } from '../form.interface';

@Component({
  selector: 'rr-play-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef })
  private container: ViewContainerRef;
  @Input() data: FormField = <FormField>{};

  readonly fieldMapper = {
    boolean: FieldBooleanComponent,
    callback: FieldCallbackComponent
  };

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.getComponentFor(this.data.type)
    );
    const viewContainerRef = this.container;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<FieldBaseComponent>componentRef.instance).data = this.data;
  }
  private getComponentFor(field: string) {
    return this.fieldMapper[field];
  }
}
