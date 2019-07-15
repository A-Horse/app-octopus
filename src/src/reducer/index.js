export const reducers = {
  ...require('./auth.reducer'),
  ...require('./task.reducer'),
  ...require('./todo.reducer')
};
