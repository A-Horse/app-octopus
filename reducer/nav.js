import { AppDrawerNavigator } from '../navigator';

const navReducer = (state, action) => {
  const newState = AppDrawerNavigator.router.getStateForAction(action, state);
  return newState || state;
};

export default navReducer;
