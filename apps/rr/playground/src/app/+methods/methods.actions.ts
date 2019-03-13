import { Action } from '@ngrx/store';
import { Method } from './methods.reducer';

export enum MethodsActionTypes {
  LoadMethods = '[Methods] Load Methods',
  MethodsLoaded = '[Methods] Methods Loaded',
  MethodsLoadError = '[Methods] Methods Load Error',
  ADD_METHOD = '[Methods] Add Method'
}

export class AddMethod implements Action {
  readonly type = MethodsActionTypes.ADD_METHOD;
  constructor(public payload: Method) {}
}

export class LoadMethods implements Action {
  readonly type = MethodsActionTypes.LoadMethods;
}

export class MethodsLoadError implements Action {
  readonly type = MethodsActionTypes.MethodsLoadError;
  constructor(public payload: any) {}
}

export class MethodsLoaded implements Action {
  readonly type = MethodsActionTypes.MethodsLoaded;
  constructor(public payload: Method[]) {}
}

export type MethodsAction =
  | AddMethod
  | LoadMethods
  | MethodsLoaded
  | MethodsLoadError;

export const fromMethodsActions = {
  LoadMethods,
  MethodsLoaded,
  MethodsLoadError,
  AddMethod
};
