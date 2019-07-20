# Feed State

Once you've done all state work you might need to preload it when app starts. Make sure to call this method only once.

```typescript
import { feedState } from '@reactive/state';

//...

feedState();
```

A good place to put this method is the **app.module** file.

