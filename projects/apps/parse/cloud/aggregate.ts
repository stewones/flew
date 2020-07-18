import { fetch } from '@rebased/core';

export async function aggregate(req) {
  const query = req.params.query;
  const name = req.params.fetch;

  return fetch(name)
    .driver(`parse`)
    .query(query)
    .find()
    .toPromise();
}
