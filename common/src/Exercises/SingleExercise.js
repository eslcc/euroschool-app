import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, WebView } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from './actions';


const styles = StyleSheet.create({
    coreview: {
        marginTop: 54,
        flex: 1,
    },
    heading: {
        fontWeight: '300',
        fontSize: 24,
        color: '#212121',
    },
    subheading: {
        fontSize: 20,
        color: '#727272',
    },
});

class SingleExercise extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
        details: PropTypes.object.isRequired,
        loadDetail: PropTypes.func.isRequired,
    }

    componentDidMount() {
        const { loadDetail, item } = this.props;
        loadDetail(item.id);
    }

    render() {
        const { details: allDetails, item } = this.props;
        const details = allDetails[item.id];
        if (details) {
            const mmnt = moment(details.due
                .replace(/\//g, '-')
                .replace(/([0-9]{2})-([0-9]{2})-([0-9]{4})/, '$3-$2-$1')
            );
            return (
                <View style={styles.coreview}>
                    <Text style={styles.subheading}>{details.type} / {details.course}</Text>
                    <Text style={styles.heading}>{details.title}</Text>
                    <Text>Due {details.due}, {mmnt < moment ? mmnt.toNow() : mmnt.fromNow()}</Text>
                    <Text>{details.status}</Text>
                    <Text>{details.grade}</Text>
                    <WebView
                        source={{ html: details.generalComment }}
                        scalesPageToFit
                        style={{ flex: 1 }}
                    />
                </View>
            );
        }
        return (
            <View style={styles.coreview}>
                <Text>{JSON.stringify(item)}</Text>
            </View>
        );
    }
}


const mapStateToProps = state => ({
    details: state.exercises.exerciseDetails,
});

const mapDispatchToProps = dispatch => ({
    loadDetail: id => dispatch(actions.loadExerciseDetail(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleExercise);
