import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Method, MethodChange } from '../../interfaces/method.interface';
import { PlayState } from '../../+play/play.reducer';
import { getAllMethods } from '../../+play/method/method.selectors';
import { FormFieldChangeEvent } from '../../components/form/form.interface';
import {
  RemoveChainMethod,
  AddChainMethod,
  UpdateChainMethod
} from '../../+play/method/method.actions';
import { UserService } from '../../services/user.service';
import { PlayService } from '../../interfaces/play.interface';
import { AlbumService } from '../../services/album.service';
import { CommentService } from '../../services/comment.service';
import { PhotoService } from '../../services/photo.service';
import { TodoService } from '../../services/todo.service';
import { Collection } from '../../interfaces/collection.interface';
import { getSelectedCollection } from '../../+play/collection/collection.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'rr-play-chaining-picker-container',
  templateUrl: './chaining-picker-container.component.html',
  styleUrls: ['./chaining-picker-container.component.css']
})
export class ChainingPickerContainerComponent implements OnInit, OnDestroy {
  methods$: Observable<Method[]>;

  service: { [key: string]: PlayService } = {
    UserService: this.userService,
    AlbumService: this.albumService,
    CommentService: this.commentService,
    PhotoService: this.photoService,
    TodoService: this.todoService
  };

  selectedCollection: Collection = <Collection>{};
  selectedCollection$: Subscription;

  instrument$: Subscription;

  constructor(
    private store: Store<PlayState>,
    private userService: UserService,
    private albumService: AlbumService,
    private commentService: CommentService,
    private photoService: PhotoService,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.methods$ = this.store.pipe(select(getAllMethods));
    this.selectedCollection$ = this.store
      .pipe(select(getSelectedCollection))
      .subscribe((entry: Collection) => (this.selectedCollection = entry));
  }

  ngOnDestroy() {
    this.selectedCollection$.unsubscribe();
  }

  addMethod(payload: Method) {
    this.store.dispatch(new AddChainMethod(payload));
  }

  removeMethod(payload: Method) {
    this.store.dispatch(new RemoveChainMethod(payload));
  }

  updateMethod(payload: Method) {
    this.store.dispatch(new UpdateChainMethod(payload));
  }

  didAddMethod($event: MethodChange) {
    const event: FormFieldChangeEvent = $event.event;

    if (event.checked) {
      // add to chainig
      this.addMethod($event.method);
    } else {
      // remove from chaining
      this.removeMethod($event.method);
    }
  }

  didUpdateMethod($event: MethodChange) {
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
      .join('');
  }

  execute() {
    if (this.instrument$) this.instrument$.unsubscribe();

    let instrument = this.getInstrumentation();
    instrument = instrument.replace(
      'this.$collection',
      'this.service[this.selectedCollection.service].$collection'
    );
    instrument += '.get()';

    // console.log(
    //   instrument,
    //   this.service[this.selectedCollection.service].$collection
    // );

    this.instrument$ = eval(instrument)
      .pipe(
        map((r: Response) => {
          console.log(r);
        })
      )
      .subscribe();
  }
}
