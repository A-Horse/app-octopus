// @flow
import Actions from '../action/actions';
import R from 'ramda';

export function todo(state = { token: null, userId: null }, action: FSAction) {
  switch (action.type) {
    case Actions.GET_TODOBOX.SUCCESS: {
      const todoBoxId = action.payload.id;
      const todos = action.payload.data;
      return {
        ...state,
        [todoBoxId]: todos
      };
    }

    case Actions.UPDATE_TODO.REQUEST: {
      const todos = state[action.meta.todoBoxId] || [];
      const index = R.findIndex(R.propEq('id', action.payload.id))(todos);
      return {
        ...state,
        [action.meta.todoBoxId]: R.update(
          index,
          {
            ...todos[index],
            ...action.payload
          },
          todos
        )
      };
    }

    default:
      return state;
  }
}
