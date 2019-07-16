# Sync Response

By default RR will automatically take care of this. But if you find yourself in a situation where you need, you can just

{% code-tabs %}
{% code-tabs-item title="sync-state.ts" %}
```typescript
import { Store } from '@ngxs/store';
import { ReactiveResponseSync } from '@firetask/state';
import { Response } from '@firetask/reactive-record';

// ...

store.dispatch(new ReactiveResponseSync(result as Response));
```
{% endcode-tabs-item %}
{% endcode-tabs %}

