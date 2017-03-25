import { apiUrl } from '../constant';

export function makeServerApi(path) {
  return `${apiUrl}/${path}`;
}
