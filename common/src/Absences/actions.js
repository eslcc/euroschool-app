import * as actions from './actionTypes';

export const loadAbsences = () => ({
    type: actions.LOAD_ABSENCES,
});

export const absencesLoaded = list => ({
    type: actions.ABSENCES_LOADED,
    list,
});
