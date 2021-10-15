import { createAction } from '@rebased/state';

export const decrement = createAction<number>('decrement');
