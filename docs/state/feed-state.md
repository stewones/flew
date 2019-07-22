# Feed State

Once you've done all state work you might need to preload it when app starts. Make sure to call this method only once.

```typescript
import { feedState } from '@reative/state';

@NgModule({
  //...
})
export class AppModule {
  constructor() {
    feedState();
  }
}
```

A good place to put this method is in **app.module** file, after app initialisation.

