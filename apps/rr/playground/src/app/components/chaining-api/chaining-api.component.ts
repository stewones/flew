import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { PlayMethod } from '../../interfaces/method.interface';
import { js } from 'js-beautify';
import Prism from 'prismjs';

@Component({
  selector: 'rr-play-chaining-api',
  templateUrl: './chaining-api.component.html',
  styleUrls: ['./chaining-api.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChainingApiComponent implements OnInit {
  @Input() methods: PlayMethod[] = [];
  constructor() {}

  ngOnInit() {}

  beautify(method: PlayMethod) {
    const transformFn = this.valueTransform(method);
    return transformFn(this.highlight(js(this.removeComments(method.value))));
  }

  highlight(method: PlayMethod | any) {
    const transformFn = this.valueTransform(method);
    return transformFn(
      Prism.highlight(
        method.value || method,
        Prism.languages.javascript,
        'javascript'
      )
    );
  }

  removeComments(text) {
    return text.replace(/[^:]\/\/.*/g, '').replace(/\r?\n|\r/g, '');
  }

  valueTransform(method: PlayMethod) {
    return method.valueTransform && typeof method.valueTransform === 'function'
      ? method.valueTransform
      : v => v;
  }
}
