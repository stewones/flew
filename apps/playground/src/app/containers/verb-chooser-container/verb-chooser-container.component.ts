import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayMethod } from '../../interfaces/method.interface';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { map, tap, last } from 'rxjs/operators';
import { isArray, isObject } from 'lodash';
import { MatSelectChange } from '@angular/material';

import { PlayState } from '../../+state/play.state';
import { PlayCollection } from '../../interfaces/collection.interface';
import { PlayService, PlayPlatform } from '../../interfaces/play.interface';

import {
  AddResponse,
  ClearResponse
} from '../../+state/response/response.actions';
import { ClearLog } from '../../+state/log/log.actions';
import { ClearChain } from '../../+state/chain/chain.actions';
import { UpdateVerb } from '../../+state/method/method.actions';

import { AppService } from '../../services/app.service';
import { UserService } from '../../services/user.service';
import { UserServerService } from '../../services/user-server.service';

import { AlbumService } from '../../services/album.service';
import { CommentService } from '../../services/comment.service';
import { PhotoService } from '../../services/photo.service';
import { TodoService } from '../../services/todo.service';
import { Reative } from '@reative/records';

@Component({
  selector: 'rr-play-verb-chooser-container',
  templateUrl: './verb-chooser-container.component.html',
  styleUrls: ['./verb-chooser-container.component.css']
})
export class VerbChooserContainerComponent implements OnInit, OnDestroy {
  methods$: Observable<PlayMethod[]> = this.store
    .select(PlayState.verbs)
    .pipe(tap((verbs: PlayMethod[]) => (this.verbs = verbs)));

  selectedMethod$: Subscription;
  selectedMethod: PlayMethod = <PlayMethod>{};
  verbs: PlayMethod[];

  service: { [key: string]: PlayService } = {
    UserService: this.userService,
    UserServerService: this.userServerService,
    AlbumService: this.albumService,
    CommentService: this.commentService,
    PhotoService: this.photoService,
    TodoService: this.todoService
  };

  selectedCollection: PlayCollection = <PlayCollection>{};
  selectedCollection$: Subscription;

  instrument$: Subscription;

  target$: Subscription;
  platform: PlayPlatform;

  constructor(
    private app: AppService,
    private store: Store,
    private appService: AppService,
    private userService: UserService,
    private userServerService: UserServerService,
    private albumService: AlbumService,
    private commentService: CommentService,
    private photoService: PhotoService,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.selectedMethod$ = this.store
      .select(PlayState.selectedVerb)
      .pipe(tap((entry: PlayMethod) => (this.selectedMethod = entry)))
      .subscribe();

    this.selectedCollection$ = this.store
      .select(PlayState.selectedCollection)
      .pipe(
        tap((entry: PlayCollection) => {
          this.selectedCollection = entry;
          this.loadCache();
        })
      )
      .subscribe();

    this.target$ = this.store
      .select(PlayState.selectedPlatform)
      .pipe(tap(platform => (this.platform = platform)))
      .subscribe();
  }

  ngOnDestroy() {
    this.selectedMethod$.unsubscribe();
    this.selectedCollection$.unsubscribe();
    this.target$.unsubscribe();
  }

  clearResponse() {
    this.store.dispatch(new ClearResponse());
    this.store.dispatch(new ClearChain());
    this.store.dispatch(new ClearLog());
  }

  loadCache() {
    this.app.loadCache$.next();
  }

  clearCache() {
    this.app.clearCache$.next();
  }

  didUpdateVerb($event: MatSelectChange) {
    this.selectedMethod = this.verbs.find(it => it.name === $event.value);
    this.store.dispatch(new UpdateVerb(this.selectedMethod));
  }

  getInstrumentation() {
    const text = document.getElementsByTagName<any>(
      'rr-play-chaining-api-container'
    )[0].innerText;

    return text
      .split(`\n`)
      .join('')
      .split(`  `)
      .join('')
      .split(': Response') // hardfix to remove ts notation O.o
      .join('');
  }

  execute() {
    this.store.dispatch(new ClearLog());
    if (this.instrument$) this.instrument$.unsubscribe();

    let instrument = this.getInstrumentation();
    instrument = instrument.replace(
      'this.$collection',
      'this.service[this.selectedCollection.service].$collection'
    );

    // console.log(
    //   instrument,
    //   this.service[this.selectedCollection.service].$collection
    // );

    //
    // first remove all the previous responses
    this.store.dispatch(new ClearResponse());

    //
    // execute the instrument
    this.instrument$ = eval(instrument)
      .pipe(
        map((r: Response) => {
          let result = JSON.parse(JSON.stringify(r));
          if (
            isArray(result) ||
            (isObject(result) &&
              !result.data &&
              !result.key &&
              !result.response)
          ) {
            result = { _: result };
          } else {
            result = result;
          }
          this.store.dispatch(new AddResponse(result));
          return r;
        }),
        last((value: Response, index: number, source: Observable<any>) => {
          Reative.storage.length().then(totalCached => {
            // console.log(value, index, source);
            if (!totalCached) {
              setTimeout(() => this.loadCache(), 0); // force load of cache for the very first request
            } else if (index >= 1) {
              //
              // load cache viewer
              setTimeout(() => this.loadCache(), 0);
            }
          });

          return true;
        })
      )
      .subscribe();
  }
}
