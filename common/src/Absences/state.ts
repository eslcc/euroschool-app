const moment = require('moment');

import Cache from '../../lib/utils/cache';
import absences from '../../lib/euroschool/absences';

const actionTypes = {
    LOAD_ABSENCES: 'euroschool.LOAD_ABSENCES',
    ABSENCES_LOADED: 'exercises.ABSENCES_LOADED',
};

const loadAbsences = (bustCache = false) => async (dispatch: (action: any) => any) => {
    if (!bustCache) {
        const cached = await Cache.get('absences') as AbsencesState;
        if (cached) {
            dispatch(absencesLoaded(cached.list, cached.lastUpdate));
            return;
        }
    }
    
    const list = await absences();
    const time = new Date().valueOf();
    Cache.set(
        'absences',
        { list, lastUpdate: time },
        { expires: moment().set({ hour: 23, minute: 59, second: 59 }).unix() }
    );
    dispatch(absencesLoaded(list, time));
};

const absencesLoaded = (list: string[], time?: number) => ({
    type: actionTypes.ABSENCES_LOADED,
    list,
    lastUpdate: time,
});

const actions = {
    loadAbsences,
    absencesLoaded,
};

interface AbsencesState {
    list: string[];
    lastUpdate: number;
    loading: boolean;
}

const initialState: AbsencesState = {
    list: [],
    lastUpdate: -1,
    loading: false,
};

const selectors = {
    absences: (state: any) => state.absences.list,
    loading: (state: any) => state.absences.loading,
    lastUpdate: (state: any) => state.absences.lastUpdate,
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.LOAD_ABSENCES:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.ABSENCES_LOADED:
            return {
                ...state,
                list: action.list,
                lastUpdate: action.lastUpdate || new Date().valueOf(),
                loading: false,
            };
        default:
            return state;
    }
};

export {
    actionTypes,
    actions,
    reducer,
    selectors,
};
