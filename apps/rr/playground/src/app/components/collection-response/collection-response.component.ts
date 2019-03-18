import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { PlayResponse } from '../../interfaces/play.interface';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'rr-play-collection-response',
  templateUrl: './collection-response.component.html',
  styleUrls: ['./collection-response.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionResponseComponent implements OnInit {
  @Input() data: PlayResponse[] = [];
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    //if (changes.data.currentValue) {
    this.mountTree();
    // }
  }

  mountTree() {
    const response: PlayResponse = this.data[this.data.length - 1];
    if (response) {
      console.log('new response');
    }
  }
}
