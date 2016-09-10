import { LOGIN_FAILED } from '../ActionTypes';

const initialState = {
    login: {
        email: '',
        password: '',
        failed: false,
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_FAILED:
            return {
                ...state,
                login: {
                    failed: true,
                },
            };
        default:
            return state;
    }
};
