import { makeServerApi } from '../util/api-maker';

// TODO: remove
export function makeTodosUrl(boxId, meta, todoId) {
  if (boxId) {
    return; // TBD
  }
  return makeServerApi(`user/${meta.userId}/todo${todoId ? '/' + todoId : ''}`);
}
