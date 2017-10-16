import { apiUrl } from '../constant';

export function makeServerApi(path) {
  if (path[0] === '/') {
    return `${apiUrl}${path}`;
  }
  return `${apiUrl}/${path}`;
}
