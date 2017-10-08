import * as React from 'react';
const { NavigationBar, Title } = require('@shoutem/ui');
import { truncate, trim } from 'lodash';

export default (props: any) => {
    // Truncate the string, and add ... if truncated.
    const truncated = truncate(trim(props.title.substr(0, 18)), { length: 17 });
    return (
        <NavigationBar
            centerComponent={<Title>{truncated}</Title>}
        />
    );
};
