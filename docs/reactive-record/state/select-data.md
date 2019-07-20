---
description: >-
  Working with redux patterns can be annoying, but with Reactive Records, it's
  not.
---

# Select Data

This is an elegant way to select data and keep it connected directly with store, so screen should react to every manipulation that occurs in _RR State_.

{% hint style="info" %}
1. define a key on the chaining
2. use the same key to grab from state
{% endhint %}

{% code-tabs %}
{% code-tabs-item title="todo-container.component.ts" %}
```typescript
import { Select } from '@ngxs/store';
import { key } from '@reactive/state';

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss']
})
export class TodoContainerComponent implements OnInit {

  @Select(key('todos')) todos$: Observable<Todo[]>;
  
  constructor(private todoService: TodoService) {}
 
  ngOnInit() {
    this.todoService
      .$collection
      .key(`todos`)
      .post('/todos')
      .subscribe();
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

Although we can write even less code

{% code-tabs %}
{% code-tabs-item title="todo-container.component.ts" %}
```typescript
import { select } from '@reactive/state';

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss']
})
export class TodoContainerComponent implements OnInit {

  todos$: Observable<Todo[]> = select('todos');
  
  constructor(private todoService: TodoService) {}
 
  ngOnInit() {
    this.todoService
      .$collection
      .key(`todos`)
      .post('/todos')
      .subscribe();
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

Now that we have selected and set an **Observable** of _Todos_, we can just iterate it in our html using the **async** pipe

{% hint style="info" %}
The symbol **$** at the end of word **todos** stands for presence of an **Observable**. That's not a rule, just a convention by community on naming variables and/or methods.
{% endhint %}

{% code-tabs %}
{% code-tabs-item title="todo.component.html" %}
```markup
<app-todo
  *ngFor="let todo of (todos$ | async)"
  [entry]="todo">
</app-todo>
```
{% endcode-tabs-item %}
{% endcode-tabs %}

{% code-tabs %}
{% code-tabs-item title="todo.component.ts" %}
```typescript

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  @Input() entry: Todo;
  constructor) {}
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

