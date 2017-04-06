import { makeServerApi } from '../util/api-maker';

export function makeTodosUrl(userId, listData) {
  switch (listData.type) {
  case 'defalt':
    return makeServerApi(`user/${userId}/todo`);
  default:
    return 'todo';
  }
}
