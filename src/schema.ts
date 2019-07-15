import { schema } from 'normalizr';

export const user = new schema.Entity('user');

export const TaskCard = new schema.Entity('TaskCard');
export const TaskTrack = new schema.Entity('TaskTrack', { cards: [TaskCard] });

export const TaskBoard = new schema.Entity('TaskBoard', { tracks: [TaskTrack] });
export const TaskBoards = new schema.Array(TaskBoard);
