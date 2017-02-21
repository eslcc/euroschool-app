import Raven from 'raven-js';

export default store => next => action => {
    Raven.captureBreadcrumb({
        category: 'redux',
        data: action,
    })
    return next(action);
};
