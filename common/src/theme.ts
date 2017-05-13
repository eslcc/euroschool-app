const { getTheme } = require('@shoutem/ui');



const theme = getTheme();

export default {
    ...theme,
    defaultFont: {
        fontFamily: 'System',
    },
};
