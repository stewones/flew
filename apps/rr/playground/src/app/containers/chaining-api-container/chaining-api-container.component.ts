import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PlayMethod } from '../../interfaces/method.interface';
import { PlayState } from '../../+state/play.state';

@Component({
  selector: 'rr-play-chaining-api-container',
  templateUrl: './chaining-api-container.component.html',
  styleUrls: ['./chaining-api-container.component.css']
})
export class ChainingApiContainerComponent implements OnInit {
  @Select(PlayState.selectedMethods) selectedMethods$: Observable<PlayMethod[]>;
  @Select(PlayState.selectedVerb) selectedVerb$: Observable<PlayMethod>;

  constructor() {}

  ngOnInit() {}
}
