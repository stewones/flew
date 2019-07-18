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



