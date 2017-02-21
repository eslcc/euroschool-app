import * as types from './types';

export default [
    types.header('Moneweb'),
    types.text('moneweb.username', 'Username', '', 'email-address'),
    types.text('moneweb.password', 'Password', '', 'default', true),
    types.header('Developer Tools'),
    types.label('Be careful with these.'),
    types.dispatchButton('Purge Local State', (state) => {
        alert(JSON.stringify(state));
        return ({ type: 'debug.RESET_STATE' })
    }),
    types.button('Open State Transition Explorer (BROKEN, DO NOT USE!)', () => { alert('What did I just say?') }),
];
