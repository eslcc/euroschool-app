import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import HTMLView from 'react-native-htmlview';
import * as actions from './actions';


const styles = StyleSheet.create({
    coreview: {
        marginTop: 54,
        flex: 1,
        marginHorizontal: 16,
    },
    heading: {
        fontWeight: '300',
        fontSize: 28,
        color: '#212121',
        marginVertical: 6,
    },
    subheading: {
        fontSize: 24,
        color: '#727272',
        marginVertical: 2,
    },
    text: {
        marginVertical: 2,
    },
});

class SingleExercise extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
        details: PropTypes.object.isRequired,
        loadDetail: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            itemId: props.item.id,
        };
    }

    componentDidMount() {
        const { loadDetail, item } = this.props;
        loadDetail(item.id);
    }

    componentWillReceiveProps() {
        const { loadDetail, item } = this.props;
        if (item.id !== this.state.itemId) {
            loadDetail(item.id);
        }
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
                <ScrollView style={styles.coreview}>
                    <Text style={styles.subheading}>{details.type} / {details.course}</Text>
                    <Text style={styles.heading}>{details.title}</Text>
                    <Text style={styles.text}>Due {details.due}, {mmnt < moment ? mmnt.toNow() : mmnt.fromNow()}</Text>
                    <Text style={styles.text}>{details.status}</Text>
                    <Text style={styles.text}>{details.grade}</Text>
                    <HTMLView
                        value={details.generalComment}
                        style={{ flex: 1, paddingBottom: 300 }}
                    />
                </ScrollView>
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
