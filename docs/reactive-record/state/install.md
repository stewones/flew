# Getting Started

## Installation

```bash
$ npm install --save @firetask/state
```

{% hint style="info" %}
Dependencies
{% endhint %}

```bash
$ npm i -P @ngxs/store && npm i -P lodash
```

### Load Module

{% code-tabs %}
{% code-tabs-item title="app.module.ts" %}
```typescript
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { ReactiveState, ReactiveStateModule } from '@firetask/state';
import { environment } from '../environments/environment';

@NgModule({
  // ...
  imports: [
    //
    // init ngxs stuff
    NgxsModule.forRoot([ReactiveState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    //
    // init rr state
    ReactiveStateModule.forRoot()
  ]
})
export class AppModule {}

```
{% endcode-tabs-item %}
{% endcode-tabs %}

