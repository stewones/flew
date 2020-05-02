import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  ReativeModule,
  StateModule,
  ReativeState,
  StoreModule
} from '@reative/angular';
import { TodoListContainerModule } from './containers/todo-list-container/todo-list-container.module';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
export function someReducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    //
    // ngxs
    NgxsModule.forRoot([ReativeState], {
      developmentMode: !environment.production
    }),
    ReativeModule.forRoot({
      silent: false,
      baseURL: 'https://jsonplaceholder.typicode.com'
    }),
    StateModule.forRoot({ production: false }),
    // StoreModule.forRoot({
    //   production: false,
    //   reducers: { someReducer },
    //   initialState: { someReducer: 32535 }
    // }),
    TodoListContainerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
