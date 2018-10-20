// @flow
import Actions from '../action/actions';

export function todo(state = { token: null, userId: null }, action: FSAction) {
  switch (action.type) {
    case Actions.GET_TODOBOX.SUCCESS:
      const todoBoxId = action.payload.id;
      const todos = action.payload.data;
      return {
        ...state,
        [todoBoxId]: todos
      };

    default:
      return state;
  }
}
