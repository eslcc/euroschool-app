import { Dimensions } from 'react-native';

export type Orientation = 'PORTRAIT' | 'LANDSCAPE';

export interface Screen {
    width: number;
    height: number;
}

const actionTypes = {
    layoutChange: 'euroschool.ORIENTATION_CHANGE',
};

interface OrientationState {
    orientation: Orientation;
    screen: Screen;
}

const dimens = Dimensions.get('window');
const initialState: OrientationState = {
    orientation: dimens.width > dimens.height ? 'LANDSCAPE' : 'PORTRAIT',
    screen: {
        width: dimens.width,
        height: dimens.height,
    },
};

const selectors = {
    orientation: (state: any) => state.layout.orientation,
    screen: (state: any) => state.layout.screen,
};

const layoutChange = (newScreen: Screen) => ({
    type: actionTypes.layoutChange,
    screen: newScreen,
    orientation: screen.height > screen.width
                ? 'PORTRAIT'
                : 'LANDSCAPE',
});

const actions = {
    layoutChange,
};

const reducer = (state = initialState, action: any) => {
    switch(action.type) {
        case actionTypes.layoutChange:
            return {
                ...state,
                orientation: action.orientation,
                screen: action.screen,
            };
        default:
            return state;
    }
};

export {
    actionTypes,
    selectors,
    actions,
    reducer,
};
