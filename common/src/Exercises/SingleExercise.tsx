import React, { Component, PropTypes } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect, Dispatch } from 'react-redux';
import * as moment from 'moment';
import HTMLView from 'react-native-htmlview';

import { ExerciseDetail } from '../../lib/msm/exercises';
import { actions } from './state';
import styles from '../../styles';

interface SingleExerciseProps {
    route: any;
    details: ExerciseDetail[];
    loadDetail: (id: number) => void;
}

interface SingleExerciseState {

}

class SingleExercise extends Component<SingleExerciseProps, SingleExerciseState> {
    static route = {
        navigationBar: {
            title: (params: any) => {
                return params.title;
            },
        },
    };

    constructor(props: SingleExerciseProps) {
        super(props);
        this.state = {
            itemId: props.route.params.item.id,
        };
    }

    componentDidMount() {
        const { loadDetail } = this.props;
        const item = this.props.route.params.item;
        loadDetail(item.id);
    }

    renderGrade(details: ExerciseDetail) {
        const matches = details.grade.match(/([0-9.]+)\/([0-9.]+)/);
        if (matches) {
            const grade = parseFloat(matches[1]);
            const outOf = parseFloat(matches[2]);
            const overall = Math.round((grade / outOf) * 10 * 100) / 100;
            return <Text style={styles.exercises.grade}>{`${grade}/${outOf} (${overall})`}</Text>;
        }
        return details.grade;
    }

    renderSupportingComment(details: ExerciseDetail) {
        if (details.supportingComment.length > 0) {
            return (
                <HTMLView
                    value={details.supportingComment}
                    style={styles.exercises.comment}
                />
            );
        }
        return null;
    }

    render() {
        const { details: allDetails } = this.props;
        const item = this.props.route.params.item;
        const details = allDetails[item.id];
        if (details) {
            const mmnt = moment(details.due
                .replace(/\//g, '-')
                .replace(/([0-9]{2})-([0-9]{2})-([0-9]{4})/, '$3-$2-$1')
            );
            return (
                <ScrollView style={styles.core.screenContainerNoTabs}>
                    <Text style={styles.core.subText}>{details.type} / {details.course}</Text>
                    <Text style={styles.core.mainText}>{details.title}</Text>
                    <Text style={styles.core.textMargin}>
                        Due {details.due}, {mmnt < moment() ? mmnt.toNow() : mmnt.fromNow()}
                    </Text>
                    <Text style={styles.core.textMargin}>{details.status}</Text>
                    <Text style={styles.core.textMargin}>{this.renderGrade(details)}</Text>
                    {this.renderSupportingComment(details)}
                    <View style={styles.exercises.comment}>
                        <HTMLView
                            value={details.generalComment}
                        />
                    </View>
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


const mapStateToProps = (state: any) => ({
    details: state.exercises.exerciseDetails,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    loadDetail: (id: string) => dispatch(actions.loadExerciseDetail(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleExercise as any);
