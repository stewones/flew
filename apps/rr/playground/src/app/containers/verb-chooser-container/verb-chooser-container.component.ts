import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayMethod } from '../../interfaces/method.interface';
import { Observable, Subscription } from 'rxjs';
import { PlayState } from '../../+play/play.reducer';
import { Store, select } from '@ngrx/store';
import {
  getAllMethods,
  getSelectedVerb
} from '../../+play/method/method.selectors';
import { map, tap, last } from 'rxjs/operators';
import { PlayCollection } from '../../interfaces/collection.interface';
import { PlayService } from '../../interfaces/play.interface';
import { AppService } from '../../services/app.service';
import { UserService } from '../../services/user.service';
import { AlbumService } from '../../services/album.service';
import { CommentService } from '../../services/comment.service';
import { PhotoService } from '../../services/photo.service';
import { TodoService } from '../../services/todo.service';
import { getSelectedCollection } from '../../+play/collection/collection.selectors';
import {
  RemoveCollectionResponses,
  LoadCollectionCachedResponses,
  ClearCollectionCachedResponses,
  AddCollectionResponse
} from '../../+play/response/response.actions';
import {
  RemoveAllChainMethods,
  UpdateChainVerb
} from '../../+play/method/method.actions';
import { MatSelectChange } from '@angular/material';
import { isArray, isObject } from 'lodash';

@Component({
  selector: 'rr-play-verb-chooser-container',
  templateUrl: './verb-chooser-container.component.html',
  styleUrls: ['./verb-chooser-container.component.css']
})
export class VerbChooserContainerComponent implements OnInit, OnDestroy {
  methods$: Observable<PlayMethod[]> = this.store.pipe(
    select(getAllMethods),
    map((methods: PlayMethod[]) => methods.filter(it => it.target === 'verb')),
    tap((verbs: PlayMethod[]) => (this.verbs = verbs))
  );

  selectedMethod$: Subscription;
  selectedMethod: PlayMethod = <PlayMethod>{};
  verbs: PlayMethod[];

  service: { [key: string]: PlayService } = {
    UserService: this.userService,
    AlbumService: this.albumService,
    CommentService: this.commentService,
    PhotoService: this.photoService,
    TodoService: this.todoService
  };

  selectedCollection: PlayCollection = <PlayCollection>{};
  selectedCollection$: Subscription;

  instrument$: Subscription;

  constructor(
    private store: Store<PlayState>,
    private appService: AppService,
    private userService: UserService,
    private albumService: AlbumService,
    private commentService: CommentService,
    private photoService: PhotoService,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.selectedMethod$ = this.store
      .pipe(select(getSelectedVerb))
      .subscribe((entry: PlayMethod) => (this.selectedMethod = entry));

    this.selectedCollection$ = this.store
      .pipe(select(getSelectedCollection))
      .subscribe((entry: PlayCollection) => {
        this.selectedCollection = entry;
        this.loadCache();
      });
  }

  ngOnDestroy() {
    this.selectedMethod$.unsubscribe();
    this.selectedCollection$.unsubscribe();
  }

  clearResponse() {
    this.store.dispatch(new RemoveCollectionResponses());
    this.store.dispatch(new RemoveAllChainMethods()); // @todo need to figure out a way to reset the values for dynamic fields
  }

  loadCache() {
    this.store.dispatch(new LoadCollectionCachedResponses());
  }

  clearCache() {
    this.store.dispatch(new ClearCollectionCachedResponses());
  }

  didUpdateVerb($event: MatSelectChange) {
    this.selectedMethod = this.verbs.find(it => it.name === $event.value);
    this.store.dispatch(new UpdateChainVerb(this.selectedMethod));
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
    this.store.dispatch(new LoadCollectionCachedResponses());
    if (this.instrument$) this.instrument$.unsubscribe();

    let instrument = this.getInstrumentation();
    instrument = instrument.replace(
      'this.$collection',
      'this.service[this.selectedCollection.service].$collection'
    );
    // instrument += `.${this.selectedVerbMethod.name}()`;

    // console.log(
    //   instrument,
    //   this.service[this.selectedCollection.service].$collection
    // );

    //
    // first remove all the previous responses
    this.store.dispatch(new RemoveCollectionResponses());

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
          this.store.dispatch(new AddCollectionResponse(result));
          return r;
        }),
        last((value: Response, index: number, source: Observable<any>) => {
          this.appService.$collection.storage.length().then(totalCached => {
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
