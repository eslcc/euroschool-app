export default store => next => action => {
  if (action.type == 'debug.RESET_STATE') {
    return undefined;
  }
  return next(action);
}
