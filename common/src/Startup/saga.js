import {takeLatest} from 'redux-saga';
import {put, select, call} from 'redux-saga/effects';
import {Actions} from 'react-native-router-flux';
import * as neutron from '../../lib/appcore/neutron';
import * as msm from '../../lib/msm/login';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

const loginPersistedData = state => ({
    email: state.login.email,
    password: state.login.password,
    failed: state.login.failed,
});

function* startup() {
    const status = yield call(msm.getLoginStatus);
    if (status) {
        yield call(Actions.main);
    } else {
        // If login fails (session expiration), the email and password may still be persisted.
        // In this case, attempt login with persisted credentials.
        const login = yield select(loginPersistedData);
        const {email, password, failed} = login;
        if (email !== '' && password !== '' && !failed) {
            const result = yield call(neutron.login, email, password);
            if (result) {
                yield call(Actions.main);
            } else {
                yield put(actions.loginNeeded());
            }
        } else {
            yield call(Actions.login);
        }
    }
}

export default function*() {
    yield takeLatest(actionTypes.CHECK_LOGIN, startup);
}
