import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PlayResponse } from '../../interfaces/play.interface';
import { PlayState } from '../../+state/play.state';

@Component({
  selector: 'play-collection-response-container',
  templateUrl: './collection-response-container.component.html',
  styleUrls: ['./collection-response-container.component.css']
})
export class CollectionResponseContainerComponent implements OnInit {
  @Select(PlayState.responses) responses$: Observable<PlayResponse[]>;

  constructor() {}

  ngOnInit() {}
}
