import { collection } from '@reative/core';

export async function aggregate(req) {
  const query = req.params.query;
  const name = req.params.collection;

  return collection(name)
    .driver(`parse`)
    .query(query)
    .find()
    .toPromise();
}
