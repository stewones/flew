---
description: 'Type less, do more.'
---

# Schematics

Speed up your workflow by using our angular schematics

### Installation

```bash
$ npm install --save-dev @reative/schematics
```

### Usage

#### Creating a collection service

```bash
$ ng g @reative/schematics:collection user --endpoint=/api/users
```

Command will produce something like this

```typescript
import { Injectable } from '@angular/core';
import { Collection, Records } from '@reative/core';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
@Collection({
  name: 'users',
  endpoint: '/api/users'
})
export class UserService {
  $collection: Records;

  constructor() {}

  find(): Observable<User[]> {
    return this.$collection.find();
  }

  findOne(id: string): Observable<User> {
    return this.$collection.where(`id`, `==`, id).findOne();
  }
}
```

#### Creating a container component

Containers are compound by a component file plus the module which wraps that component. The idea behind it is that only containers should retain business logic while "pure" components are dumbs and only contains presentional data.

```bash
$ ng g @reative/schematics:container users
```

Command will create a new folder named **users-container** containing these files

{% code title="users-container.component.ts" %}

```typescript
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { Observable } from 'rxjs';
import { select } from '@reative/state';

@Component({
  selector: '',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersContainerComponent implements OnInit {
  entries$: Observable<any[]>;

  constructor(protected detector: ChangeDetectorRef) {}

  ngOnInit() {
    this.entries$ = select('entries');
  }
}
```

{% endcode %}

{% code title="users-container.module.ts" %}

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersContainerComponent } from './users-container.component';

@NgModule({
  declarations: [UsersContainerComponent],
  imports: [CommonModule],
  exports: [UsersContainerComponent]
})
export class UsersContainerModule {}
```

{% endcode %}

#### Creating a dumb component

```bash
$ ng g @reative/schematics:component users
```

Command will create a folder named **users** containing these files

{% code title="users.component.ts" %}

```typescript
import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: '',
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

{% endcode %}

{% code title="users.module.ts" %}

```typescript
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

{% endcode %}

> The act of creating individual modules which wraps the feature is a very efficient approach and helps angular to save you several bytes in the tree shaking process.

### Default schematics

If you want to avoid typing **@reative/schematics** every time you go to create a new piece, you can just set our schematics as a default collection for your cli. No worries, you will still be able to use the angular ones.

{% code title="angular.json" %}

```javascript
{
    //...
    "cli": {
        "defaultCollection": "@reative/schematics"
    }
    //...
}
```

{% endcode %}
