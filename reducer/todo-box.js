import { normalize } from 'normalizr';
import R from 'ramda';
import { GET_TODOBOX_SUCCESS } from '../action/todo';
import { TodoBox, TodoBoxs } from '../schema';
import Actions from '../action/actioner';

const todoBox = (
  state = {
    todoBox: {},
    isAddTodoBoxSuccess: false
  },
  action
) => {
  switch (action.type) {
    case GET_TODOBOX_SUCCESS:
      const boxs = [...action.playload.todoBoxs, { name: 'My Todo', id: null, type: 'only' }];
      const normalizedTodoBoxs = normalize(boxs, TodoBoxs);
      return {
        ...state,
        entities: normalizedTodoBoxs.entities.todoBox
      };
      break;
    case Actions.ADD_TODOBOX.SUCCESS:
      const normalizedTodoBox = normalize(action.playload, TodoBox);
      return {
        ...state,
        entities: {
          ...state.entities,
          ...normalizedTodoBox.entities.todoBox
        },
        isAddTodoBoxSuccess: true
      };
      break;
    case Actions.ADD_TODOBOX.FINISH:
      return {
        ...state,
        isAddTodoBoxSuccess: false
      };
      break;
    default:
      return state;
  }
};

export default todoBox;
