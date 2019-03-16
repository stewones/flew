import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { Method } from '../../interfaces/method.interface';
import { js } from 'js-beautify';
import Prism from 'prismjs';

@Component({
  selector: 'rr-play-chaining-api',
  templateUrl: './chaining-api.component.html',
  styleUrls: ['./chaining-api.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChainingApiComponent implements OnInit {
  @Input() methods: Method[] = [];
  constructor() {}

  ngOnInit() {}

  beautify(text) {
    return this.highlight(js(text));
  }

  highlight(text) {
    return Prism.highlight(text, Prism.languages.javascript, 'javascript');
  }
}
