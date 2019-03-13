import { createFeatureSelector, createSelector } from '@ngrx/store';
import { METHODS_FEATURE_KEY, MethodsState } from './methods.reducer';

// Lookup the 'Methods' feature state managed by NgRx
const getMethodsState = createFeatureSelector<MethodsState>(
  METHODS_FEATURE_KEY
);

const getLoaded = createSelector(
  getMethodsState,
  (state: MethodsState) => state.loaded
);
const getError = createSelector(
  getMethodsState,
  (state: MethodsState) => state.error
);

const getAllMethods = createSelector(
  getMethodsState,
  getLoaded,
  (state: MethodsState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getMethodsState,
  (state: MethodsState) => state.selectedId
);
const getSelectedMethods = createSelector(
  getAllMethods,
  getSelectedId,
  (methods, id) => {
    const result = methods.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const methodsQuery = {
  getLoaded,
  getError,
  getAllMethods,
  getSelectedMethods
};
