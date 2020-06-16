---
id: connect-data
title: Connect Data
description: 'Working with Redux pattern can be annoying, but not with Rebased.'
hide_title: false
---

## Example

Selecting a piece of data from store

1. define a key on the collection call
2. use the same key to grab its result from state

```ts
// todo-container.component.ts
import { collection } from '@rebased/core';
import { connect } from '@rebased/state';

interface Todo {
  name: string;
}

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss']
})
export class TodoContainerComponent implements OnInit {
  // #2 connect to the memo key
  // memo: true will automatically prepend `_memo` to the path
  todos$ = connect<Todo[]>('my-todo-list', { memo: true });

  constructor() {}

  ngOnInit() {
    collection('Todo')
      .key('my-todo-list') // #1 define a memo key
      .find()
      .subscribe();
  }
}
```

```html
<ul>
  <li *ngFor="let todo of (todos$|async)">{{todo.name}}</li>
</ul>
```
