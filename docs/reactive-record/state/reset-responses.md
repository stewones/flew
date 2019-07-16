# Reset Response

By default RR will automatically take care of this. But there's some edge cases like a logout scenario where you probably will need to reset store.

For that you can just

{% code-tabs %}
{% code-tabs-item title="reset-state.ts" %}
```typescript
import { Store } from '@ngxs/store';
import { ReactiveResponseReset } from '@firetask/state';

// ...

this.store.dispatch(new ReactiveResponseReset());
```
{% endcode-tabs-item %}
{% endcode-tabs %}

