import { Action } from '@ngrx/store';
import { Method } from '../interfaces/method.interface';

export enum PlayActionTypes {
  // LoadPlay = '[Play] Load Play',
  // PlayLoaded = '[Play] Play Loaded',
  // PlayLoadError = '[Play] Play Load Error',
  ADD_METHOD = '[Methods] Add Method'
}

export class AddMethod implements Action {
  readonly type = PlayActionTypes.ADD_METHOD;
  constructor(public payload: Method) {}
}

// export class LoadPlay implements Action {
//   readonly type = PlayActionTypes.LoadPlay;
// }

// export class PlayLoadError implements Action {
//   readonly type = PlayActionTypes.PlayLoadError;
//   constructor(public payload: any) {}
// }

// export class PlayLoaded implements Action {
//   readonly type = PlayActionTypes.PlayLoaded;
//   // constructor(public payload: Entity[]) {}
// }

export type PlayAction = AddMethod;
//| LoadPlay | PlayLoaded | PlayLoadError;

export const fromPlayActions = {
  AddMethod
  // LoadPlay,
  // PlayLoaded,
  // PlayLoadError,
};
