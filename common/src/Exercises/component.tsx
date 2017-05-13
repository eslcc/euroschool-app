import React, { Component, PropTypes } from 'react';
import { connect, Dispatch } from 'react-redux';
const moment = require('moment');
const { ListView, View, Text, TouchableOpacity } = require('@shoutem/ui');
import { ScheduleEntry } from '../../lib/msm/schedule';

import styles from '../../styles';
import { actions, selectors } from './state';

import renderRow from './Row';
import { Header, Footer } from './HeaderFooter';
import { buildGridRows, NowMarker } from './helpers';

interface ExercisesProps {
    exercises: (ScheduleEntry | NowMarker)[];
    loading: boolean;
    loadExercises: () => void;
}

interface ExercisesState {
    rows: (ScheduleEntry | NowMarker)[][];
}

const componentStyles = Object.assign({}, styles.core.screenContainer, styles.exercises.mainView);

export class Exercises extends Component<ExercisesProps, ExercisesState> {
    constructor(props: ExercisesProps) {
        super(props);
        this.state = {
            rows: [],
        };
    }

    componentDidMount() {
        this.props.loadExercises();
    }

    componentWillReceiveProps(nextProps: ExercisesProps) {
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

const mapStateToProps = (state: any) => ({
    exercises: selectors.exercises(state),
    loading: selectors.loading(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    loadExercises: (start: number = null, end: number = null) => dispatch(actions.loadExercises(start, end) as any),
});

export default connect(mapStateToProps, mapDispatchToProps)(Exercises);
