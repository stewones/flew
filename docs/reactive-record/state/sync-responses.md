# Sync Response

By default RR will automatically take care of this. But if you find yourself in a situation where you need, you can just

{% code-tabs %}
{% code-tabs-item title="sync-state.ts" %}
```typescript
import { syncState } from '@firetask/state';
import { Response } from '@firetask/reactive-record';

// ...
const result:Response = {
    collection: 'numbers',
    key: 'numbers-search',
    data: [1, 2, 3]
}
syncState(result);
```
{% endcode-tabs-item %}
{% endcode-tabs %}



