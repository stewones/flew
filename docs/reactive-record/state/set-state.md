# Set State

The **setState** method act in three different ways. When a side effect happen in your app, you can

### Merge state

```typescript
import { setState } from '@firetask/state';

setState('numbers', { id:2, code: '2' });
```

### Redefine state

This will totally reset the state for a given _key_.

```typescript
import { setState } from '@firetask/state';

setState('numbers', { data: [] }, { merge: false });
```

### Disable cache syncing

By default if _RR_ detects that you're using the cache package, _setState_ will also **save** it in the storage.  
So here is a way to disable it.

```typescript
import { setState } from '@firetask/state';

setState('numbers', { id:3, code: '3' }, { save: false });
```

### Play around select + setState

```typescript
import { select, setState } from '@firetask/state';

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss']
})
export class TodoContainerComponent implements OnInit {

  todos$: Observable<Todo[]> = select('todos');
  
  constructor(private todoService: TodoService) {}
 
  ngOnInit() {
    setState('todos', [{ id: 1, id: 2, id: 3 }]);
  }
}
```

