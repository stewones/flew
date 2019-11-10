import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { PlayCache } from '../../interfaces/play.interface';

@Component({
  selector: 'rr-play-cache-explorer',
  templateUrl: './cache-explorer.component.html',
  styleUrls: ['./cache-explorer.component.css']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CacheExplorerComponent implements OnInit {
  @Input() data: PlayCache = <PlayCache>{};

  constructor() {}

  ngOnInit() {}
}
