import { THE_CAT_API_SEARCH } from '../configs/cat';
import { createReducer } from '@rebased/state';

export const control = createReducer(
  {
    driver: 'firestore',
    pathname: THE_CAT_API_SEARCH,
    useState: true,
    useCache: true,
    useNetwork: true,
    simulateHttpError: false
  },
  {
    useState: (state, action) => {
      state.useState = action.payload;
    },
    useCache: (state, action) => {
      state.useCache = action.payload;
    },
    useNetwork: (state, action) => {
      state.useNetwork = action.payload;
    },
    setSimulateError: (state, action) => {
      state.simulateHttpError = action.payload;
    },
    setDriver: (state, action) => {
      state.driver = action.payload;
    },
    setPathname: (state, action) => {
      state.pathname = action.payload;
    }
  }
);
