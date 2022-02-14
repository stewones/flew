import { publish } from '@flew/core';

export function navigateTo(pathname) {
  publish('navigateTo', pathname);
  return {
    type: 'navigateTo',
    payload: pathname,
  };
}
