// TODO this file is a den of bollocks rapidly in need of refactoring
// TODO: two months later, still not refactored, wtf

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
const { ListView, View, Text, TouchableOpacity } = require('@shoutem/ui');
import { ScheduleEntry } from '../../lib/msm/schedule';

import styles from '../../styles';
import { actions, selectors } from './state';

import renderRow from './Row';
import { Header, Footer } from './HeaderFooter';
import { buildGridRows } from './helpers';

interface ExercisesProps {
    exercises: ScheduleEntry[];
    loading: boolean;
    loadExercises: () => void;
}

interface ExercisesState {
    rows: ScheduleEntry[][];
}

const componentStyles = Object.assign({}, styles.core.screenContainer, styles.exercises.mainView);

export class Exercises extends Component<ExercisesProps, ExercisesState> {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
        };
    }

    componentDidMount() {
        this.props.loadExercises();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.exercises !== nextProps.exercises) {
            const data = nextProps.exercises.slice(0);
            const rows = buildGridRows(data);
            this.setState({
                rows,
            });
        }
    }

    render() {
        return (
            <View style={componentStyles}>
                <ListView
                    data={this.state.rows}
                    loading={this.props.loading}
                    renderRow={renderRow}
                    renderHeader={Header}
                    renderFooter={Footer}
                    styleName="flexible"
                    style={styles.exercises.list}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    exercises: selectors.exercises(state),
    loading: selectors.loading(state),
});

const mapDispatchToProps = dispatch => ({
    loadExercises: (start = null, end = null) => dispatch(actions.loadExercises(start, end)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Exercises);
