---
id: connect
title: Connect
description: 'Working with Redux pattern can be annoying, but not with Rebased.'
hide_title: false
---

Provides reactive data access through observables

## Fetch example

```ts title="todo-container.component.ts"
import { fetch } from '@rebased/core';
import { connect } from '@rebased/state';

interface Todo {
  name: string;
}

@Component({
  // ...
})
export class TodoContainerComponent implements OnInit {
  // connect to the state key
  todos$ = connect<Todo[]>('my-todo-list', { fetch: true });

  ngOnInit() {
    fetch('Todo')
      // define the fetch state key to connect with
      .key('my-todo-list')
      .find()
      .subscribe();
  }
}
```

```html title="todo-container.component.html"
<ul>
  <li *ngFor="let todo of (todos$|async)">{{todo.name}}</li>
</ul>
```

## Reducer example

```ts title="counter-container.component.ts"
import { connect, dispatch } from '@rebased/state';

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss']
})
export class TodoContainerComponent implements OnInit {
  counter$ = connect<number>('counter');

  constructor() {}

  ngOnInit() {
    dispatch({
      type: 'increment',
      payload: 54
    });
  }
}
```

```html title="counter-container.component.html"
{{counter$ | async}}
```
