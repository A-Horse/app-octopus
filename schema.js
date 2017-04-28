import { normalize, schema } from 'normalizr';

export const Todo = new schema.Entity('todo');
export const Todos = new schema.ArrayTodo);

export const TodoBox = new schema.Entity('todoBox');
export const TodoBoxs = new schema.Array(TodoBox);
