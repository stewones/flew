---
id: set-state
title: Set State
description: 'Great resources to get started learning and using Rebased with Redux State'
hide_title: false
---

Arbitrary and quicker way to persist some data into state.

:::caution
Use this api with caution, the most scalable way to modify a pieca of global state is using reducers.
:::

## Disable cache

By default Rebased detects if you're using cache and will also **save** data into storage.

```ts
import { setState } from '@rebased/state';

setState('numbers', [1, 2, 3], { save: false }); // skip cache
```

## Play around

Quick way to show up data from global state using angular

```ts
import { connect, setState } from '@rebased/state';

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss']
})
export class TodoContainerComponent implements OnInit {
  numbers$ = connect<number[]>('numbers', { state: true });

  constructor() {}

  ngOnInit() {
    setState('numbers', [1, 2, 3]);
  }
}
```

```html
<ul>
  <li *ngFor="let num of (numbers$|async)">{{number}}</li>
</ul>
```
