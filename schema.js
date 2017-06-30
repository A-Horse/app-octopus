import { normalize, schema } from "normalizr";

export const Todo = new schema.Entity("todo");
export const Todos = new schema.Array(Todo);

export const TodoBox = new schema.Entity("todoBox");
export const TodoBoxs = new schema.Array(TodoBox);
