// TODO this file is a den of bollocks rapidly in need of refactoring

import React, {Component, PropTypes} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import {ListView} from '@shoutem/ui';

import styles from '../../styles';

import renderRow from './Row';
import * as actions from './actions';

const DumbHeader = ({ start, end, load }) => {
    // TODO refactor this out
    const loadWeekBefore = () => load(moment.unix(start).subtract(1, 'w').unix(), end);
    return (
        <TouchableHighlight onPress={loadWeekBefore}>
            <Text>Showing exercises since {moment.unix(start).calendar()}. Tap to load more.</Text>
        </TouchableHighlight>
    );
};

const DumbFooter = ({ start, end, load }) => {
    // TODO refactor this out
    const loadWeekAfter = () => load(start, moment.unix(end).add(1, 'w').unix());
    return (
        <TouchableHighlight onPress={loadWeekAfter}>
            <Text>Showing exercises until {moment.unix(end).calendar()}. Tap to load more.</Text>
        </TouchableHighlight>
    );
};

DumbHeader.propTypes = DumbFooter.propTypes = {
    start: PropTypes.number,
    end: PropTypes.number,
    load: PropTypes.func,
};

const mapHeaderFooterStateToProps = state => ({
    start: state.exercises.loadedStart,
    end: state.exercises.loadedEnd,
});

const mapHeaderFooterDispatchToprops = dispatch => ({
    load: (start, end) => dispatch(actions.loadExercises(start, end)),
});

const mapper = connect(mapHeaderFooterStateToProps, mapHeaderFooterDispatchToprops);
const Header = mapper(DumbHeader);
const Footer = mapper(DumbFooter);

export class Exercises extends Component {
    static propTypes = {
        exercises: PropTypes.arrayOf(React.PropTypes.object),
        loading: PropTypes.bool,
        loadExercises: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        this.props.loadExercises();
    }

    componentWillReceiveProps(nextProps) {
        const rows = nextProps.exercises.slice(0);
        const yesterday = moment().subtract(1, 'd');
        rows.push({
            NOW_MARKER: 1,
            start: yesterday,
        });
        rows.sort(
            (a, b) => {
                const ma = moment(a.start);
                const mb = moment(b.start);
                if (ma.isBefore(mb)) {
                    return -1;
                }
                if (ma.isAfter(mb)) {
                    return 1;
                }
                return 0;
            }
        );
        this.setState({
            data: rows,
        });
    }

    render() {
        return (
            <View style={styles.exercises.mainView}>
                <ListView
                    data={this.state.data}
                    loading={this.props.loading}
                    renderRow={row => renderRow(row)}
                    renderHeader={() => <Header />}
                    renderFooter={() => <Footer />}
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
