# Reset State

By default _RR_ will automatically take care of this. But there's some edge cases such as a logout scenario where you probably will need to fully reset the store.

For that you can just

{% code-tabs %}
{% code-tabs-item title="reset-state.ts" %}
```typescript
import { resetState } from '@reative/state';

// ...

resetState();
```
{% endcode-tabs-item %}
{% endcode-tabs %}

