# Reset State

By default RR will automatically take care of this. But there's some edge cases like a logout scenario where you probably will need to fully reset the store.

For that you can just

{% code-tabs %}
{% code-tabs-item title="reset-state.ts" %}
```typescript
import { resetState } from '@firetask/state';

// ...

resetState();
```
{% endcode-tabs-item %}
{% endcode-tabs %}

