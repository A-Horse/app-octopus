import { Component } from 'react';
import { AsyncStorage } from 'react-native'
import { persistStore } from 'redux-persist'

import 'rxjs'; // TODO 不应该全部引入 https://redux-observable.js.org/docs/Troubleshooting.html RxJS operators are missing!

import { setupSignApp, setupMainApp } from './navigation-setup';
import AuthService from './service/auth';
import store from './store';

export default class App extends Component {
  constructor(props) {
    super(props);
    // persistStore(store, {storage: AsyncStorage}, this.start).purge();
    persistStore(store, {storage: AsyncStorage}, this.start);
  }

  start() {
    const state = store.getState();
    const isLogin = AuthService.checkLoginFromState(state);
    isLogin ? setupMainApp() : setupSignApp();
  }
}
