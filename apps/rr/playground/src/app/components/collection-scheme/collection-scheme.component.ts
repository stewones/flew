import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { PlayCollection } from '../../interfaces/collection.interface';

@Component({
  selector: 'rr-play-collection-scheme',
  templateUrl: './collection-scheme.component.html',
  styleUrls: ['./collection-scheme.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionSchemeComponent implements OnInit {
  @Input() data: PlayCollection = <PlayCollection>{};

  constructor() {}

  ngOnInit() {}
}
