import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  SimpleChanges
} from '@angular/core';
import { PlayCollection } from '../../interfaces/collection.interface';

declare var document;

@Component({
  selector: 'play-collection-scheme',
  templateUrl: './collection-scheme.component.html',
  styleUrls: ['./collection-scheme.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionSchemeComponent implements OnInit {
  @Input() data: PlayCollection = <PlayCollection>{};

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data.currentValue) {
      setTimeout(() => {
        const height = document.getElementsByClassName('CodeMirror-sizer')[0]
          .clientHeight;
        if (height < 300) {
          document
            .getElementsByTagName('play-collection-scheme')[0]
            .getElementsByClassName('CodeMirror')[0].style.height = `${height +
            18}px`;
        }
      }, 0);
    }
  }
}
