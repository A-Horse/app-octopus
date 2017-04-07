import { makeServerApi } from '../util/api-maker';

export function makeTodosUrl(id, meta) {
  if (id) {
    return; // TBD
  }
  return makeServerApi(`user/${meta.userId}/todo`);
}
