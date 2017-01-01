import { LOGIN_FAILED, LOGIN_SUCCESS, LOGIN_ATTEMPT } from './actionTypes';

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
                email: action.email,
                password: action.password,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                inProgress: false,
            };
        default:
            return state;
    }
};
