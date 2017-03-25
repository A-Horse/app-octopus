import { Component } from 'react';
import { NavigatorIOS } from 'react-native';
import { checkLogin } from './service/auth';

class App extends Component {
  constructor() {
    super();
    this.state = {waitting: true, isLogin: false};
  }

  async componentWillMount() {
    const isLogin = await checkLogin();
    this.setState({isLogin, waitting: false});
  }

  renderMain() {
    if (this.state.waitting) {
      return this.renderLoading();
    }
    if (!this.state.isLogin) {
      return <LoginScreen />
    }
    return <AppWithNavigationState />;
  }

  renderLoading() {
    return <View><Text>Loading</Text></View>;
  }

  render() {
    return (
        <Provider store={store}>
        {this.renderMain()}
      </Provider>
    );
  }
}

export default App;
