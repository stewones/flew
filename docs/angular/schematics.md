---
id: schematics
title: Schematics
description: 'Great resources to get started learning and using Rebased with Angular Schematics'
hide_title: true
---

# Schematics

Speed up your workflow by using angular schematics

### Installation

```bash
$ npm install --save-dev @rebased/schematics
```

### Available templates

- component
- page

### Setting default schematic

If you want to avoid typing **@rebased/schematics** every time you go to create a new piece, you can just set our schematics as default for your cli. You will still be able to use the angular one.

```json
// angular.json
{
  //...
  "cli": {
    "defaultCollection": "@rebased/schematics"
  }
  //...
}
```

### Example

#### Creating a page

```bash
$ ng g page users
```

Command will create a folder named **users** under the **pages** folder containing a combo of component + module

:::info
Creating individual modules which wraps the feature will help angular save you several bytes while on production.
:::

#### Creating component

```bash
$ ng g component users
```

Command will create a folder named **users** under the **components** containing a combo of component + module

```ts
// users.component.ts
import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  @Input() entry: any = {};

  constructor(protected detector: ChangeDetectorRef) {}

  ngOnInit() {}
}
```

```ts
// users.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule],
  exports: [UsersComponent]
})
export class UsersModule {}
```
