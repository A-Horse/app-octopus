import { normalize, schema } from 'normalizr';

export const todo = new schema.Entity('todo');
export const todos = new schema.Array(todo);
