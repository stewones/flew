import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { Subscription, Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { ReactiveState } from '@firetask/reactive-record';

@Component({
  selector: 'firetask-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Reactive Record Demo';

  todos$: Subscription;

  @Select(ReactiveState.key('baby'))
  baby$: Observable<Response>;

  constructor(public todoService: TodoService) {}

  ngOnInit() {
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
      .findOne()
      //.toPromise()
      .subscribe(r => console.log(r), err => console.log(err));
  }
}
