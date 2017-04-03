import { makeServerApi } from '../util/api-maker';

export function makeTodosUrl(userId, listData) {
  console.log(listData);
  switch (listData.type) {
  case 'defalt':
    return makeServerApi(`user/${userId}/todo`);
  default:
    return 'todo';
  }
}
