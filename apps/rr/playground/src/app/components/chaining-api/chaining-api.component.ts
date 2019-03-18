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

  beautify(text) {
    return this.highlight(js(this.removeComments(text)));
  }

  highlight(text) {
    return Prism.highlight(text, Prism.languages.javascript, 'javascript');
  }

  removeComments(text) {
    return text.replace(/[^:]\/\/.*/g, '').replace(/\r?\n|\r/g, '');
  }
}
