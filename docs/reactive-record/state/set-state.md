# Set State

The **setState** method act in three different ways. When side effects happens in your application, you can

### Merge state

```typescript
import { setState } from '@firetask/state';

setState('numbers', { id:2, code: '2' });
```

### Redefine state

```typescript
import { setState } from '@firetask/state';

setState('numbers', { data: [] }, { merge:false });
```

### Disable cache sync

```typescript
import { setState } from '@firetask/state';

setState('numbers', { id:3, code: '3' }, { save:false });
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

  todos$: Observable<Todo[]>;
  
  constructor(private todoService: TodoService) {}
 
  ngOnInit() {
    setState('todos', [{ id: 1, id: 2, id: 3 }]);
  }
}
```

