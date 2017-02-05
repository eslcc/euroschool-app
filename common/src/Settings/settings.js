import { purgeStoredState } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

const settings = {
    'moneweb.username': {
        key: 'moneweb.username',
        type: 'string',
        default: '',
        secure: false,
        category: 'Moneweb',
        label: 'Username',
    },
    'moneweb.password': {
        key: 'moneweb.password',
        type: 'string',
        default: '',
        secure: true,
        category: 'Moneweb',
        label: 'Password',
    },
    'local.purge': {
        type: 'button',
        label: 'Purge Local State',
        category: 'Development Options',
        onClick: () => global.store.dispatch({ type: 'debug.RESET_STATE' }),
    },
    'debug.transitionState': {
        type: 'button',
        label: 'Open State Transition Explorer',
        category: 'Development Options',
        onClick: () => Actions.transitionExplorer(),
    },
};

export default settings;

export function categories() {
    const categoryMap = {};
    Object.keys(settings).forEach((itemKey) => {
        const item = settings[itemKey];
        if (!categoryMap[item.category]) {
            categoryMap[item.category] = [];
        }
        categoryMap[item.category].push(item);
    });
    return categoryMap;
}
