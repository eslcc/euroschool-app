import * as actions from './actionTypes';

export const loadAbsences = (bustCache = false) => ({
    type: actions.LOAD_ABSENCES,
    bustCache,
});

export const absencesLoaded = (list, time) => ({
    type: actions.ABSENCES_LOADED,
    list,
    lastUpdate: time,
});
