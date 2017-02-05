// TODO this file is a den of bollocks rapidly in need of refactoring
// TODO: two months later, still not refactored, wtf

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { ListView, View, Text, TouchableOpacity } from '@shoutem/ui';

import styles from '../../styles';

import renderRow from './Row';
import * as actions from './actions';

const DumbHeader = ({ start, end, load }) => {
    // TODO refactor this out
    // TODO only download one week at a time, to avoid ludicrous server load
    const loadWeekBefore = () => load(moment.unix(start).subtract(1, 'w').unix(), end);
    return (
        <TouchableOpacity onPress={loadWeekBefore}>
            <Text style={styles.t}>Showing exercises since {moment.unix(start).calendar()}. Tap to load more.</Text>
        </TouchableOpacity>
    );
};

const DumbFooter = ({ start, end, load }) => {
    // TODO refactor this out
    // TODO only download one week at a time, to avoid ludicrous server load
    const loadWeekAfter = () => load(start, moment.unix(end).add(1, 'w').unix());
    return (
        <TouchableOpacity onPress={loadWeekAfter}>
            <Text style={styles.t}>Showing exercises until {moment.unix(end).calendar()}. Tap to load more.</Text>
        </TouchableOpacity>
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

function buildGridRows(dataIn) {
    const data = dataIn.slice(0);
    const lengths = [1, 1];
    const defaultLength = 2;
    const result = [];

    const yesterday = moment().subtract(1, 'd');
    data.push({
        NOW_MARKER: 1,
        start: yesterday,
    });

    data.sort(
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

    let currentLength = 0;
    while (data.length > 0) {
        if (data[0].NOW_MARKER) {
            result.push(data.splice(0, 1));
        } else {
            const thisLength = currentLength < lengths.length ? lengths[currentLength] : defaultLength;
            result.push(data.splice(0, thisLength));
            currentLength++;
        }
    }
    return result;
}

export class Exercises extends Component {
    static propTypes = {
        exercises: PropTypes.arrayOf(React.PropTypes.object),
        loading: PropTypes.bool,
        loadExercises: PropTypes.func,
    };

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
        trace: 'exercise rows', this.state.rows;
        return (
            <View style={Object.assign({}, styles.core.screenContainer, styles.exercises.mainView)}>
                <ListView
                    data={this.state.rows}
                    loading={this.props.loading}
                    renderRow={row => renderRow(row)}
                    renderHeader={() => <Header />}
                    renderFooter={() => <Footer />}
                    styleName="flexible"
                    style={{...styles.fill, ...styles.exercises.list}}
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
