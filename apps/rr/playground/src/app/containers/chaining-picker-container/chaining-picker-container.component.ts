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
  UpdateChainVerb
} from '../../+play/method/method.actions';
import { UserService } from '../../services/user.service';
import { PlayService, PlayCache } from '../../interfaces/play.interface';
import { AlbumService } from '../../services/album.service';
import { CommentService } from '../../services/comment.service';
import { PhotoService } from '../../services/photo.service';
import { TodoService } from '../../services/todo.service';
import { PlayCollection } from '../../interfaces/collection.interface';
import { getSelectedCollection } from '../../+play/collection/collection.selectors';
import { map, combineLatest, last, tap } from 'rxjs/operators';
import {
  AddCollectionResponse,
  RemoveCollectionResponses
} from '../../+play/response/response.actions';
import { Response } from '@firetask/reactive-record';
import { MatSelectChange } from '@angular/material';
import { PlayMethods } from '../../constants/method';
import { isArray, isObject } from 'lodash';

@Component({
  selector: 'rr-play-chaining-picker-container',
  templateUrl: './chaining-picker-container.component.html',
  styleUrls: ['./chaining-picker-container.component.css']
})
export class ChainingPickerContainerComponent implements OnInit, OnDestroy {
  methodsChain$: Observable<PlayMethod[]> = this.store.pipe(
    select(getAllMethods),
    map((methods: PlayMethod[]) => methods.filter(it => it.target === 'chain'))
  );
  verbMethods$: Observable<PlayMethod[]> = this.store.pipe(
    select(getAllMethods),
    map((methods: PlayMethod[]) => methods.filter(it => it.target === 'verb')),
    tap((verbs: PlayMethod[]) => (this.verbs = verbs))
  );

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

  verbs: PlayMethod[];
  selectedVerbMethod: PlayMethod = PlayMethods.find(it => it.name === 'get');

  cache: PlayCache[] = this.resetCache();

  constructor(
    private store: Store<PlayState>,
    private userService: UserService,
    private albumService: AlbumService,
    private commentService: CommentService,
    private photoService: PhotoService,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.selectedCollection$ = this.store
      .pipe(select(getSelectedCollection))
      .subscribe((entry: PlayCollection) => (this.selectedCollection = entry));
  }

  ngOnDestroy() {
    this.selectedCollection$.unsubscribe();
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
      .split(': Response')
      .join('');
  }

  execute() {
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
          // console.log(value, index, source);
          if (index >= 1) {
            //
            // load cache viewer
            this.loadCache();
          }
          return true;
        })
      )
      .subscribe();
  }

  clearCache() {
    this.service[this.selectedCollection.service].$collection.clearCache();
  }

  resetCache(): PlayCache[] {
    return [{ key: '', data: {} }];
  }

  didUpdateVerb($event: MatSelectChange) {
    this.selectedVerbMethod = this.verbs.find(it => it.name === $event.value);
    this.store.dispatch(new UpdateChainVerb(this.selectedVerbMethod));
  }

  loadCache() {
    this.cache = [];
    this.service[this.selectedCollection.service].$collection.storage.forEach(
      (value, key, index) => {
        this.cache.push({
          key: key,
          data: value
        });
      }
    );
  }
}
