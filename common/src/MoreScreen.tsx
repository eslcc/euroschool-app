import React, { Component } from 'react';
const { ListView, Button, Text } = require('@shoutem/ui');
const autobind = require('autobind-decorator');
import Router from './router';

const ITEMS = [
    {
        label: 'Settings',
        route: 'settings',
    },
];

interface MoreProps {
    navigator: any;
}

export default class MoreScreen extends Component<MoreProps, {}> {
    _goToItem: (item: any) => () => void;

    constructor(props: MoreProps) {
        super(props);
        this._goToItem = (item: any) => () => this.props.navigator.push(Router.getRoute(item.route));
    }

    @autobind
    renderItem(item: any) {
        return (
            <Button onPress={this._goToItem(item)}>
                <Text>{item.label}</Text>
            </Button>
        );
    }

    render() {
        return (
            <ListView
                data={ITEMS}
                renderRow={this.renderItem}
            />
        );
    }
}
