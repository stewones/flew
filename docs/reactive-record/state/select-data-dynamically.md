# Select Dynamically

However you might need to select state dynamically, such as on a search feature. To accomplish that we don't need to grab anything from NGXS.

{% code-tabs %}
{% code-tabs-item title="todo-container.component.ts" %}
```typescript
import { select } from '@firetask/state';

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss']
})
export class TodoContainerComponent implements OnInit {

  todos$: Observable<Todo[]>;

  constructor(
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.load()
  }

  load() {
    const query = 'kitty';
    const storeKey = `todos-search:${query}`;

    //
    // first we set the observable
    this.todos$ = select(storeKey);

    //
    // and then execute a query    
    this.todoService
      .$collection
      .key(storeKey)
      .post(`/search?q=${query}`)
      .subscribe();
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}



### Cleaning the view

```typescript
this.todos$ = null;
```

