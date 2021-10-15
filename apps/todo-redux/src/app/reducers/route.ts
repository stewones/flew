import { createReducer } from '@reative/state';

export const route = createReducer(
  {
    pathname: null,
    loading: false
  },
  {
    navigateTo: (state, action) => {
      state.loading = true;
      state.pathname = action.payload;
    },
    navigateEnd: (state, action) => {
      state.loading = false;
    }
  }
);
