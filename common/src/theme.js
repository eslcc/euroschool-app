const { getTheme } = require('@shoutem/ui');

console.log(JSON.stringify(typeof getTheme()));

const theme = getTheme();

export default {
    ...theme,
    defaultFont: {
        fontFamily: 'System',
    },
};
