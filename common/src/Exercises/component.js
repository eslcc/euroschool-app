import React, { Component, PropTypes } from 'react';
import { View, ListView, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import renderRow from './Row';
import * as actions from './actions';

const styles = StyleSheet.create({
    mainView: {
        top: 54,
        flex: 1,
    },
});

export class Exercises extends Component {
    static propTypes = {
        exercises: PropTypes.array,
        loading: PropTypes.bool,
        loadExercises: PropTypes.func,
    }

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(this.props.exercises || []),
        };
    }

    componentDidMount() {
        this.props.loadExercises();
    }

    render() {
        if (this.props.loading) {
            return <Text>loading</Text>;
        }
        return (
            <View style={styles.mainView}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={row => renderRow(row)}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    exercises: state.exercises.exercises,
    loading: state.exercises.loading,
});

const mapDispatchToProps = dispatch => ({
    loadExercises: (start = null, end = null) => dispatch(actions.loadExercises(start, end)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Exercises);
