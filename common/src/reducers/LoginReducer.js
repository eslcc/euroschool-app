import { LOGIN_FAILED, LOGIN_SUCCESS, LOGIN_ATTEMPT } from '../ActionTypes';

const initialState = {
    email: '',
    password: '',
    failed: false,
    inProgress: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_FAILED:
            return {
                ...state,
                failed: true,
            };
        case LOGIN_ATTEMPT:
            return {
                ...state,
                inProgress: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                inProgress: false,
                email: action.email,
                password: action.password,
            };
        default:
            return state;
    }
};
