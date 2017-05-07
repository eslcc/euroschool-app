import * as moment from 'moment';
import { Dispatch } from 'redux';

import msmSchedule, { ScheduleEntry } from '../../lib/msm/schedule';
import msmExercise, { ExerciseDetail } from '../../lib/msm/exercises';

const actionTypes = {
    LOAD_EXERCISES: 'euroschool.LOAD_EXERCISES',
    EXERCISES_LOADED: 'euroschool.EXERCISES_LOADED',
    LOAD_EXERCISE_DETAIL: 'euroschool.LOAD_EXERCISE_DETAIL',
    EXERCISE_DETAIL_LOADED: 'euroschool.EXERCISE_DETAIL_LOADED',
};

interface State {
    exercises: ScheduleEntry[];
    exerciseDetails: { [id: string]: ExerciseDetail };
    loading: boolean;
    loadedStart: number;
    loadedEnd: number;
}

const initialState: State = {
    exercises: [],
    exerciseDetails: {},
    loading: false,
    loadedStart: null,
    loadedEnd: null,
};

const selectors = {
    exercises: (state: any) => state.exercises.exercises,
    loading: (state: any) => state.exercises.loading,
    start: (state: any) => state.exercises.loadedStart,
    end: (state: any) => state.exercises.loadedEnd,
};

const loadExercises = (start: number = null, end: number = null) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: actionTypes.LOAD_EXERCISES,
        start,
        end,
    });

    const loadStart = start || moment() // first day of this week
            .isoWeekday(1)
            .set({ hour: 0, minute: 0, second: 0 })
            .unix();
    
    const loadEnd = end || moment() // last day of this week
            .isoWeekday(7)
            .set({ hour: 23, minute: 59, second: 59 })
            .unix();

    const data = (await msmSchedule(loadStart, loadEnd)).schedule;
    
    const filtered = data.filter(
        item => item.entry_type === 'Exercise',
    );

    dispatch({
        type: actionTypes.EXERCISES_LOADED,
        exercises: filtered,
        start: loadStart,
        end: loadEnd,
    });
};

const loadExerciseDetail = (id: number) => async (dispatch: Dispatch<any>) => {
    const detail = await msmExercise(id);

    dispatch({
        type: actionTypes.EXERCISE_DETAIL_LOADED,
        id,
        detail,
    });
};

const actions = {
    loadExercises,
    loadExerciseDetail,
};


function mergeArrays<T extends { id: any }>(base: T[], top: T[]): T[] {
    if (base.length === 0) {
        return top;
    }
    const result = base.slice(0);
    top.forEach(item => {
        const includes = base.find(val => item.id === val.id);
        if (!includes) {
            result.push(item);
        }
    });
    return result;
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.LOAD_EXERCISES:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.EXERCISES_LOADED:
            return {
                ...state,
                loading: false,
                exercises: mergeArrays(state.exercises, action.exercises),
                loadedStart: action.start,
                loadedEnd: action.end,
            };
        case actionTypes.EXERCISE_DETAIL_LOADED:
            return {
                ...state,
                exerciseDetails: {
                    ...state.exerciseDetails,
                    [action.id]: action.detail,
                },
            };
        default:
            return state;
    }
};

export {
    actionTypes,
    selectors,
    reducer,
    actions,
};
