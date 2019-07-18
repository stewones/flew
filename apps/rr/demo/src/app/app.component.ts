import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { Subscription, Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { key } from '@firetask/state';
import { Response, Config } from '@firetask/reactive-record';
import { UserService } from './user.service';
import { CatService } from './cat.service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { firebaseLogin } from '../environments/firebase.config';

@Component({
  selector: 'firetask-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Reactive Record Demo';

  todos$: Subscription;

  @Select(key('baby')) baby$: Observable<Response>;
  @Select(key('baby-firestore', true)) babyFirestore$: Observable<any>;
  @Select(key('baby-firebase', true)) babyFirebase$: Observable<any>;
  @Select(key('cat', true)) cat$: Observable<any>;

  babyDynamic$: Observable<Response<{}>>;

  shouldUseCache = 'yes';
  useCacheResult = [];

  constructor(
    public todoService: TodoService,
    private catService: CatService,
    private store: Store,
    private userService: UserService,
    private http: HttpClient
  ) {
    // Reactive.options.connector.http = http;
  }

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

    // this.todoService
    //   .getCat()
    //   //.toPromise()
    //   .subscribe(r => console.log(r), err => console.log(err));

    this.userService.$collection
      .key('baby')
      .ttl(10)
      .get('/images/search')
      .subscribe(r => console.log(r), err => console.log(`ERROR---->`, err));
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
  getCatFirestoreFail() {
    this.catService.$collection
      .driver('firestore')
      // .key('baby-firestore')
      .where('user.id', '==', 'asdf')
      // .diff(() => false)
      .findOne()
      //.toPromise()
      .subscribe(r => console.log(`result`, r), err => console.log(err));
  }

  getCatFirestoreNoCache() {
    this.catService.$collection
      .driver('firestore')
      .key('baby-firestore')
      .useCache(false)
      .find()
      //.toPromise()
      .subscribe(r => console.log(r), err => console.log(err));
  }

  getCatFirebase() {
    this.catService.$collection
      .driver('firebase')
      .key('baby-firebase')
      .findOne()
      //.toPromise()
      .subscribe(r => console.log(r), err => console.log(err));
  }

  getCatFirebaseNoCache() {
    this.catService.$collection
      .driver('firebase')
      .key('baby-firebase')
      .useCache(false)
      .findOne()
      //.toPromise()
      .subscribe(r => console.log(r), err => console.log(err));
  }

  loginFirebase() {
    this.userService.$collection
      .firebase()
      .auth()
      .signInWithEmailAndPassword(firebaseLogin.email, firebaseLogin.password)
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

  useCache() {
    this.useCacheResult = [];
    const value = this.shouldUseCache === 'yes' ? true : false;
    console.log(`SHOULD USE CACHE? ${value}`);
    this.catService.$collection
      .useCache(value)
      // .transformCache(r => r.data)
      .post('/votes', { image_id: 'birm', value: 1 })
      .pipe(tap(r => this.useCacheResult.push(r)))
      .toPromise();
  }
}
