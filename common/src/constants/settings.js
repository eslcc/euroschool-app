import { purgeStoredState } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import restart from 'react-native-restart';

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
        onClick: () => purgeStoredState({ storage: AsyncStorage }).then(() => restart()),
    },
};

export default settings;

export function categories() {
    const categoryMap = {};
    Object.keys(settings).forEach(itemKey => {
        const item = settings[itemKey];
        if (!categoryMap[item.category]) {
            categoryMap[item.category] = [];
        }
        categoryMap[item.category].push(item);
    });
    return categoryMap;
}
