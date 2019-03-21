import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  PlayMethod,
  PlayMethodChange
} from '../../interfaces/method.interface';
import { PlayState } from '../../+play/play.reducer';
import { getAllMethods } from '../../+play/method/method.selectors';
import { FormFieldChangeEvent } from '../../components/form/form.interface';
import {
  RemoveChainMethod,
  AddChainMethod,
  UpdateChainMethod,
  UpdateChainVerb,
  RemoveAllChainMethods
} from '../../+play/method/method.actions';
import { UserService } from '../../services/user.service';
import { PlayService, PlayCache } from '../../interfaces/play.interface';
import { AlbumService } from '../../services/album.service';
import { CommentService } from '../../services/comment.service';
import { PhotoService } from '../../services/photo.service';
import { TodoService } from '../../services/todo.service';
import { PlayCollection } from '../../interfaces/collection.interface';
import { getSelectedCollection } from '../../+play/collection/collection.selectors';
import { map, last, tap } from 'rxjs/operators';
import {
  AddCollectionResponse,
  RemoveCollectionResponses,
  LoadCollectionCachedResponses,
  ClearCollectionCachedResponses
} from '../../+play/response/response.actions';
import { Response } from '@firetask/reactive-record';
import { MatSelectChange } from '@angular/material';
import { PlayMethods } from '../../constants/method';
import { isArray, isObject } from 'lodash';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'rr-play-chaining-picker-container',
  templateUrl: './chaining-picker-container.component.html',
  styleUrls: ['./chaining-picker-container.component.css']
})
export class ChainingPickerContainerComponent implements OnInit, OnDestroy {
  target: 'browser' | 'server' = 'browser';

  methods$: Observable<PlayMethod[]>;

  service: { [key: string]: PlayService } = {
    UserService: this.userService,
    AlbumService: this.albumService,
    CommentService: this.commentService,
    PhotoService: this.photoService,
    TodoService: this.todoService
  };

  selectedCollection: PlayCollection = <PlayCollection>{};
  selectedCollection$: Subscription;

  removeAllChainMethods$: Subscription;

  instrument$: Subscription;

  //
  // @todo migrate to an own component for verb
  verbMethods$: Observable<PlayMethod[]> = this.store.pipe(
    select(getAllMethods),
    map((methods: PlayMethod[]) => methods.filter(it => it.target === 'verb')),
    tap((verbs: PlayMethod[]) => (this.verbs = verbs))
  );

  verbs: PlayMethod[];
  selectedVerbMethod: PlayMethod = PlayMethods.find(it => it.name === 'get');

  constructor(
    private store: Store<PlayState>,
    private appService: AppService,
    private userService: UserService,
    private albumService: AlbumService,
    private commentService: CommentService,
    private photoService: PhotoService,
    private todoService: TodoService,
    private app: AppService
  ) {}

  ngOnInit() {
    this.loadMethodsFor('browser');
    this.selectedCollection$ = this.store
      .pipe(select(getSelectedCollection))
      .subscribe((entry: PlayCollection) => {
        this.selectedCollection = entry;
        this.loadCache();
      });

    this.removeAllChainMethods$ = this.app.removeAllChainMethods$.subscribe(
      () => {}
    );
  }

  ngOnDestroy() {
    this.selectedCollection$.unsubscribe();
    this.removeAllChainMethods$.unsubscribe();
  }

  addMethod(payload: PlayMethod) {
    this.store.dispatch(new AddChainMethod(payload));
  }

  removeMethod(payload: PlayMethod) {
    this.store.dispatch(new RemoveChainMethod(payload));
  }

  updateMethod(payload: PlayMethod) {
    this.store.dispatch(new UpdateChainMethod(payload));
  }

  didAddMethod($event: PlayMethodChange) {
    const event: FormFieldChangeEvent = $event.event;

    if (event.checked) {
      // add to chainig
      this.addMethod($event.method);
    } else {
      // remove from chaining
      this.removeMethod($event.method);
    }
  }

  didUpdateMethod($event: PlayMethodChange) {
    const event: FormFieldChangeEvent = $event.event;
    this.updateMethod({ ...$event.method, ...{ value: event.value } });
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
    this.selectedVerbMethod = this.verbs.find(it => it.name === $event.value);
    this.store.dispatch(new UpdateChainVerb(this.selectedVerbMethod));
  }

  loadMethodsFor(target: 'browser' | 'server' = 'browser') {
    this.methods$ = this.store.pipe(
      select(getAllMethods),
      map((methods: PlayMethod[]) =>
        methods.filter(
          it => it.target === 'chain' && it.platform.includes(target)
        )
      )
    );
    this.target = target;
  }
}
