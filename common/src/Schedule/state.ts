import {Dimensions} from "react-native";
const moment = require('moment');
import { Dispatch } from 'react-redux';

import schedule, { ScheduleEntry } from '../../lib/msm/schedule';

const actionTypes = {
    LOAD_SCHEDULE: 'euroschool.LOAD_SCHEDULE',
    SCHEDULE_LOADED: 'euroschool.SCHEDULE_LOADED',
    REFRESH_SCHEDULE_IF_NEEDED: 'euroschool.REFRESH_SCHEDULE_IF_NEEDED',
    ORIENT_SCHEDULE: 'euroschool.ORIENT_SCHEDULE',
};

const initialState = {
    schedule: (null as ScheduleEntry[]),
    scheduleLoading: true,
    screen: {
        width: -1,
        height: -1,
        landscape: false,
    },
    lastUpdate: -1,
    start: -1,
    end: -1,
};

export interface AppScreen {
    width: number;
    height: number;
    landscape: boolean;
}

const selectors = {
    schedule: (state: any) => state.schedule.schedule,
    lastUpdate: (state: any) => state.schedule.lastUpdate,
    loading: (state: any) => state.schedule.scheduleLoading,
    orient: (state: any) => state.schedule.screen,
};

const loadSchedule = (start: number = null, end: number = null) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: actionTypes.LOAD_SCHEDULE });

    const result = await schedule(
        start || moment() // first day of this week
            .isoWeekday(1)
            .set({ hour: 0, minute: 0, second: 0 })
            .unix(),
        end || moment() // last day of this week
            .isoWeekday(5)
            .set({ hour: 23, minute: 59, second: 59 })
            .unix()
    );

    dispatch({
        type: actionTypes.SCHEDULE_LOADED,
        schedule: result.schedule,
        start: result.start,
        end: result.end,
    });
};

const refreshScheduleIfNeeded = (dispatch: Dispatch<any>, getState: () => any) => {
    const lastUpdate = selectors.lastUpdate(getState());

    if ((new Date().valueOf() - lastUpdate) > 86400000) { // last updated more than a day ago
        dispatch(loadSchedule() as any); // TODO: if get errors, check this line
    }
};

const orientSchedule = (event: any) => {
    console.warn('orient'+event);
    let height = event.nativeEvent.layout.height;
    let width = event.nativeEvent.layout.width;
    return {
        type: actionTypes.ORIENT_SCHEDULE,
        screen: {
            height: height,
            width: width,
            landscape: height > width,
        }
    };

};


const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.LOAD_SCHEDULE:
            return {
                ...state,
                scheduleLoading: true,
            };
        case actionTypes.SCHEDULE_LOADED:
            return {
                ...state,
                scheduleLoading: false,
                schedule: action.schedule,
                lastUpdate: new Date().valueOf(),
                start: action.start,
                end: action.end,
            };
        case actionTypes.ORIENT_SCHEDULE:
            // const dimens = Dimensions.get('window');
            return {
                ...state,
                screen: action.screen,
                // {
                //     width: dimens.width,
                //     height: dimens.height,
                //     landscape: dimens.height > dimens.width,
                // }
            };

        default:
            return state;
    }
};

const actions = {
    loadSchedule,
    refreshScheduleIfNeeded,
    orientSchedule,
};

export {
    selectors,
    actionTypes,
    actions,
    reducer,
};
