import React from 'react';
const { NavigationBar, Title } = require('@shoutem/ui');
import { truncate, trim } from 'lodash';

export default (props) => {
    return (<NavigationBar
        centerComponent={<Title>{truncate(trim(props.title.substr(0, 18)), { length: 17 })}</Title>}
    />);
};
