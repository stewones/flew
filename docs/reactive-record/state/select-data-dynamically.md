# Select Dynamically

However you might need to select state dynamically, such as on a search feature. To accomplish that we are going to use NGXS' **Store** directly to get the result through a RR key.

{% code-tabs %}
{% code-tabs-item title="todo-container.component.ts" %}
```typescript
import { Store } from '@ngxs/store';
import { key } from '@firetask/state';

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss']
})
export class TodoContainerComponent implements OnInit {

  todos$: Observable<Todo[]>;

  constructor(
    private todoService: TodoService,
    private store: Store
  ) {}

  ngOnInit() {
    this.load()
  }

  load() {
    const query = 'kitty';
    const storeKey = `todos-search:${query}`;

    //
    // first we set the observable
    this.todos$ = this.store.select(key(storeKey));

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

