// TODO this file is a den of bollocks rapidly in need of refactoring
// TODO: two months later, still not refactored, wtf

import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
const { ListView, TouchableOpacity, Text, Row } = require('@shoutem/ui');

import styles from '../../styles';

function renderRow(row) {
    return (
        <Row>
            <TouchableOpacity onPress={Exercises.forceUpdate()}>
                <Text>
                    {JSON.stringify(row)}
                </Text>
            </TouchableOpacity>
        </Row>
    );
}

export class Exercises extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        const data = [
            {
                foo: 'bar',
            },
            {
                foo: 'bar',
            },
            {
                foo: 'bar',
            },
            {
                foo: 'bar',
            },
            {
                foo: 'bar',
            },
        ];
        this.setState({
            rows: data,
        });
    }

    render() {
        return (
            <View style={styles.exercises.mainView}>
                <ListView
                    data={this.state.rows}
                    renderRow={row => renderRow(row)}
                    styleName="flexible"
                />
            </View>
        );
    }
}

export default Exercises;
