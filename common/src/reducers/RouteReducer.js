import { Actions, ActionConst } from 'react-native-router-flux';

const initialState = {
    scene: {},
    currentRoute: {},
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
    // focus action is dispatched when a new screen comes into focus
    case ActionConst.FOCUS:
        return {
            ...state,
            scene: action.scene,
        };

    case Actions.AFTER_ROUTE:
    case Actions.AFTER_POP:
        return state.set('currentRoute', action.name);

    default:
        return state;
    }
}
