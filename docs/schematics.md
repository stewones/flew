---
description: 'Type less, do more.'
---

# Schematics

Once you’ve set you should not be repeating yourself and spending so many time on creating the pieces for your project or feature.

You can speed your workflow by using our schemes for angular.

### Installation

```bash
$ npm install --save-dev @reative/schematics
```

### Usage

#### Creating a Collection service

```bash
$ ng g @reative/schematics:collection user --endpoint=/api/users
```

Command will produce something like this

```typescript
import { Injectable } from '@angular/core';
import { Collection, Records } from '@reative/records';
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
    return this.$collection
      .where(`id`, `==`, id)
      .findOne();
  }
}
```



#### Creating a Container

A container component is formed by a component file plus a module that wraps that component. This approach is very efficient for angular tree shaking.

```bash
$ ng g @reative/schematics:container users
```

Command will create a folder called **users-container** containing this files

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
export class UsersContainerModule { }
```
{% endcode %}



#### Creating a Component

This command produces something like what the angular-cli does, except by the fact that here we also create a module

```bash
$ ng g @reative/schematics:component users
```

Command will create a folder called **users** containing this files

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
export class UsersModule { }
```
{% endcode %}



### Default schematics

If you want to avoid typing **@reative/schematics** every time you go to create a new piece, you can just set our schematics as a default collection for cli. You will still be able to use the angular ones. 

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

