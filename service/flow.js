import Storage from './storage';
import { AUTH_DATA } from '../constant';

class FlowController {
  constructor() {

  }

  initSetup() {
    Storage.get(AUTH_DATA).then(function() {

    });
  }
}

export default new FlowController();
