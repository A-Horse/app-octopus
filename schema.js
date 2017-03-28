import { normalize, Schema, arrayOf } from 'normalizr';

export const todo = new Schema('todo');
export const todos = arrayOf(todo);
