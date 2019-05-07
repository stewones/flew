import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { Subscription, Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { key } from '@firetask/angular';
import { Response, Config } from '@firetask/reactive-record';
import { UserService } from './user.service';
import { CatService } from './cat.service';
import { HttpClient } from '@angular/common/http';

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

  constructor(
    public todoService: TodoService,
    private catService: CatService,
    private store: Store,
    private userService: UserService,
    private http: HttpClient
  ) {
    // Config.options.connector.http = http;
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

  getCatFirebase() {
    this.catService.$collection
      .driver('firebase')
      .key('baby-firebase')
      .findOne()
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
