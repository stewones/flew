import { StateContext, State, Action } from '@ngxs/store';

export interface DemoStateModel {
  items: any[];
}

// export class AddResponse {
//   public static readonly type = '[Response] Add response from collection';
//   constructor(public payload: any) {}
// }

@State<DemoStateModel>({
  name: 'DemoAppState',
  defaults: {
    items: [1, 2, 3]
  }
})
export class DemoState {
  constructor() {}
}
