import React, { Component, PropTypes } from 'react';
import { View, ListView, Text, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import renderRow from './Row';
import * as actions from './actions';

const styles = StyleSheet.create({
    mainView: {
        top: 54,
        flex: 1,
        marginBottom: 108,
    },
    list: {
        paddingBottom: 128,
    },
});

const DumbHeader = ({ start, loadBefore }) => (
    <TouchableHighlight onPress={loadBefore}>
        <Text>Showing exercises since {moment.unix(start).calendar()}. Tap to load more.</Text>
    </TouchableHighlight>
);

const DumbFooter = ({ end, loadAfter }) => (
    <TouchableHighlight onPress={loadAfter}>
        <Text>Showing exercises until {moment.unix(end).calendar()}. Tap to load more.</Text>
    </TouchableHighlight>
);

DumbHeader.propTypes = DumbFooter.propTypes = {
    start: PropTypes.number,
    end: PropTypes.number,
    loadBefore: PropTypes.func,
    loadAfter: PropTypes.func,
};

const mapHeaderFooterStateToProps = state => ({
    start: state.exercises.loadedStart,
    end: state.exercises.loadedEnd,
});

const mapHeaderFooterDispatchToprops = dispatch => ({
    loadBefore: () => dispatch(actions.loadExercises('WEEK_BEFORE', null)),
    loadAfter: () => dispatch(actions.loadExercises(null, 'WEEK_AFTER')),
});

const mapper = connect(mapHeaderFooterStateToProps, mapHeaderFooterDispatchToprops);
const Header = mapper(DumbHeader);
const Footer = mapper(DumbFooter);

export class Exercises extends Component {
    static propTypes = {
        exercises: PropTypes.arrayOf(React.PropTypes.object),
        loading: PropTypes.bool,
        loadExercises: PropTypes.func,
    }

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(this.props.exercises),
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
            start: yesterday
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
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
            dataSource: ds.cloneWithRows(rows),
        });
    }

    render() {
        if (this.props.loading || this.props.exercises.length === 0) {
            return <Text>loading</Text>;
        }
        return (
            <View style={styles.mainView}>
                <ListView
                    style={styles.list}
                    dataSource={this.state.dataSource}
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
