import React from 'react';
import { NavigationBar, Title } from '@shoutem/ui';
import { truncate, trim } from 'lodash';

export default (props) => {
    return (<NavigationBar
        centerComponent={<Title>{truncate(trim(props.title.substr(0, 18)), { length: 17 })}</Title>}
    />);
};
