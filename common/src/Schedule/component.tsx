import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import Orientation from "react-native-orientation";

import ScreenService from '../../lib/utils/screenService';
import Cache from '../../lib/utils/cache';
import { ScheduleEntry } from '../../lib/msm/schedule';

import GlobalStyles from '../../styles';

import { actions, selectors } from './state';

import AdaptiveSchedule from './AdaptiveSchedule';




interface ScheduleProps {
    load: () => void;
    loading: boolean;
    refresh: () => void;
    schedule: ScheduleEntry[];
    event : any;
}
interface ScheduleState {
    landscape: boolean;
}
class Schedule extends Component<ScheduleProps, ScheduleState> {
    static route = {
        navigationBar: {
            visible: false,
        },
    };
    constructor(props: ScheduleProps) {
        super(props);
        const dimens = Dimensions.get('window');
        this.state = {
            landscape: dimens.width > dimens.height,
        };
    }
    componentWillMount() {
    }
    componentDidMount() {
        this.props.load();
    }
    componentDidUpdate() {
        if (!this.props.loading) {
            Cache.set('schedule', this.props.schedule);
        }
    }
    render() {
        if (this.props.loading) {
            return <Text>Loading</Text>;
        }
        const { schedule } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <AdaptiveSchedule schedule={schedule} />
            </View>
        );
    }
}
const mapStateToProps = (state: any) => ({
    schedule: selectors.schedule(state),
    loading: selectors.loading(state) ,
});
const mapDispatchToProps = (dispatch: (action: any) => void) => ({
    load: () => dispatch(actions.loadSchedule(null, null)),
    refresh: () => dispatch(actions.refreshScheduleIfNeeded(null, null)) ,
});
export default connect(mapStateToProps, mapDispatchToProps)(Schedule);

