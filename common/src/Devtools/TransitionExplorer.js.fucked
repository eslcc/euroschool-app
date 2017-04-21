import React, {
  Component,
} from 'react';

import {
  ScrollView,
  Text,
  TouchableHighlight,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import GlobalStyles from '../../styles';

import { routes } from '../';

export default class TransitionExplorer extends Component {

    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderRoute(route) {
        return (
            <TouchableHighlight
                onPress={Actions[route.key]}
                key={route.key}
                style={GlobalStyles.core.button}
            >
                <Text style={GlobalStyles.t}>{route.key}: {route.name}</Text>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <ScrollView style={GlobalStyles.core.screenContainerNoTabs}>
                <Text>NOTE: Messing around with state transitions can and <Text style={GlobalStyles.core.bold}>WILL</Text> cause crashes!</Text>
                {Object.keys(routes)
                    .map(key => routes[key])
                    .map(route => this.renderRoute(route))}
            </ScrollView>
        );
    }

}
