import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Dimensions,
} from 'react-native';
import { connect } from 'react-redux';

// import ScreenService from '../../lib/utils/screenService';
import Cache from '../../lib/utils/cache';
import { ScheduleEntry } from '../../lib/msm/schedule';

import GlobalStyles from '../../styles';

import { actions, AppScreen, selectors } from './state';
import { selectors as layoutSelectors, Orientation, Screen } from '../Helpers/Layout/state';

import Day, { LandscapeDay, PortraitDay } from './Day';


function DumbPortraitSchedule({ screen }: { screen: Screen }) {
    const style = {
        height: screen.height,
        width: screen.width,
    };
    return (
        <View>
            <ScrollView
                horizontal
                pagingEnabled
                style={[GlobalStyles.schedule.portraitScheduleContainer, style]}
            >
                {/* tslint:disable-next-line jsx-no-multiline-js */}
                {[1, 2, 3, 4, 5].map(num =>
                    <PortraitDay key={`${num}-portrait`} day={num} />
                )}
            </ScrollView>
        </View>
    );
}

const mapPortraitStateToProps = (state: any) => ({
    screen: layoutSelectors.screen(state),
});

const PortraitSchedule = connect(mapPortraitStateToProps)(DumbPortraitSchedule);

function LandscapeSchedule(props: {}) {
    return (
        <View style={GlobalStyles.schedule.landscapeScheduleContainer}>
            {/* tslint:disable-next-line jsx-no-multiline-js */}
            {[1, 2, 3, 4, 5].map(num =>
                <LandscapeDay key={`${num}-landscape`} day={num} />
            )}
        </View>
    );
}

interface ScheduleProps {
    load: () => void;
    loading: boolean;
    refresh: () => void;
    schedule: ScheduleEntry[];
    event : any;
    orientation: Orientation;
}

class Schedule extends Component<ScheduleProps, {}> {
    static route = {
        navigationBar: {
            visible: false,
        },
    };

    componentDidMount() {
        this.props.load();
    }

    getScheduleForOrientation() {
        const { schedule } = this.props;
        return orientation === 'LANDSCAPE'
            ? <LandscapeSchedule  />
            : <PortraitSchedule   />;
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
        return this.getScheduleForOrientation();
    }
}
const mapStateToProps = (state: any) => ({
    schedule: selectors.schedule(state),
    loading: selectors.loading(state) ,
    orientation: layoutSelectors.orientation(state),
});
const mapDispatchToProps = (dispatch: (action: any) => void) => ({
    load: () => dispatch(actions.loadSchedule(null, null)),
    refresh: () => dispatch(actions.refreshScheduleIfNeeded(null, null)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Schedule);

