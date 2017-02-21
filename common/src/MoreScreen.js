import React, { Component } from 'react';
import { ListView, Button, Text } from '@shoutem/ui';
import autobind from 'autobind-decorator';
import Router from './router';

const ITEMS = [
    {
        label: 'Settings',
        route: 'settings',
    },
];

export default class MoreScreen extends Component {
    @autobind
    renderItem(item) {
        return (
            <Button onPress={() => this.props.navigator.push(Router.getRoute(item.route))}>
                <Text>{item.label}</Text>
            </Button>
        );
    }

    render() {
        return <ListView
            data={ITEMS}
            renderRow={this.renderItem}
        />
    }
}
