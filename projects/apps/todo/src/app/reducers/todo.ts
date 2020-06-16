import { createReducer } from '@rebased/state';

export const todo = createReducer(
  {
    view: {},
    list: [],
    loading: false,
    error: null
  },
  {
    getTodoLoading: state => {
      state.loading = true;
      state.error = null;
    },
    loadingTodo: state => {
      state.loading = true;
      state.error = null;
    },
    loadingTodos: state => {
      state.loading = true;
      state.error = null;
    },
    addTodoError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addTodoList: (state, action) => {
      state.loading = false;
      state.error = null;
      state.list = action.payload;
    },
    addTodoView: (state, action) => {
      state.loading = false;
      state.error = null;
      state.view = action.payload;
    },
    savingTodo: state => {
      state.loading = true;
      state.error = null;
    },
    deletingTodo: state => {
      state.loading = true;
      state.error = null;
    }
  }
);
