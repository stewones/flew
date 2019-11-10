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

  ngOnChanges(changes: SimpleChanges) {}

  mountTree() {}

  isFromCache(response: PlayResponse) {
    return response.ttl ? true : false /*|| Object.keys(response)[0] === '_'*/;
  }

  isFromNetwork(response: PlayResponse) {
    return response.response && !this.isFromCache(response) ? true : false;
  }
}
