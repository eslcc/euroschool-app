import { getTheme } from '@shoutem/ui';

console.log(JSON.stringify(typeof getTheme()));

const theme = getTheme();

export default {
    ...theme,
    defaultFont: {
        fontFamily: 'System',
    },
};
