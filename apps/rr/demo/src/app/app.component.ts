import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { Subscription, Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { ReactiveState, Response, key } from '@firetask/reactive-record';
import { UserService } from './user.service';
import { CatService } from './cat.service';

@Component({
  selector: 'firetask-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Reactive Record Demo';

  todos$: Subscription;

  @Select(ReactiveState.key('baby', true))
  baby$: Observable<Response>;

  @Select(ReactiveState.key('baby-firestore', true))
  babyFirestore$: Observable<Response>;

  @Select(ReactiveState.key('cat', true))
  cat$: Observable<Response>;

  babyDynamic$: Observable<Response<{}>>;

  constructor(
    public todoService: TodoService,
    private catService: CatService,
    private store: Store,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.babyDynamic$ = this.store.select(key('baby', true)); // return an Observable
  }

  getCat() {
    // this.todoService
    //   .findAll()
    //   .toPromise()
    //   .then(r => console.log(r))
    //   .catch(err => console.log(err));

    // this.todoService
    //   .findOne()
    //   .toPromise()
    //   .then(r => console.log(r))
    //   .catch(err => console.log(err));

    this.todoService
      .getCat()
      //.toPromise()
      .subscribe(r => console.log(r), err => console.log(err));

    this.userService.$collection
      .key('cat')
      .get('/images/search')
      .subscribe(r => console.log(r), err => console.log(err));
  }

  postCat() {
    this.todoService
      .postCat()
      //.toPromise()
      .subscribe(r => console.log(r), err => console.log(err));
  }

  getCatFirestore() {
    this.catService.$collection
      .driver('firestore')
      .key('baby-firestore')
      .find()
      //.toPromise()
      .subscribe(r => console.log(r), err => console.log(err));
  }

  loginFirebase() {
    this.userService.$collection
      .firebase()
      .auth()
      .signInWithEmailAndPassword('demo@demo.app', '123456')
      .then(console.log)
      .catch(console.log);
  }

  logoutFirebase() {
    this.userService.$collection
      .firebase()
      .auth()
      .signOut()
      .then(console.log)
      .catch(console.log);
  }
}
