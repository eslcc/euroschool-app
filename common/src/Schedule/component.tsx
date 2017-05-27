import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import Orientation from "react-native-orientation";

// import ScreenService from '../../lib/utils/screenService';
import Cache from '../../lib/utils/cache';
import { ScheduleEntry } from '../../lib/msm/schedule';

import GlobalStyles from '../../styles';

import {actions, AppScreen, selectors} from './state';

import Day, {LandscapeDay, PortraitDay} from './Day';




function PortraitSchedule({ schedule, screen }: { schedule: ScheduleEntry[], screen: AppScreen }) {
    const style = {
        height: screen.height,
        width: screen.width ,
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
                    <PortraitDay key={`${num}-portrait`} day={num} schedule={schedule} screen={screen}/>
                )}
            </ScrollView>
        </View>
    );
}
function LandscapeSchedule({ schedule, screen }: { schedule: ScheduleEntry[], screen: Object }) {
    return (
        <View style={GlobalStyles.schedule.landscapeScheduleContainer}>
            {/* tslint:disable-next-line jsx-no-multiline-js */}
            {[1, 2, 3, 4, 5].map(num =>
                <LandscapeDay key={`${num}-landscape`} day={num} schedule={schedule} screen={screen}/>
            )}
        </View>
    );
}
/*interface AdaptiveScheduleProps {
    landscape: boolean;
    schedule: ScheduleEntry[];
}
interface AdaptiveScheduleState {
}
class AdaptiveSchedule extends  Component<AdaptiveScheduleProps, AdaptiveScheduleState> {
    constructor(props: AdaptiveScheduleProps) {
        super(props);
    }
    getScheduleForOrientation() {
        const { schedule } = this.props;
        return this.props.screen.landscape
            ? <LandscapeSchedule schedule={schedule} />
            : <PortraitSchedule  schedule={schedule} />;
    }
    render() {
        return this.getScheduleForOrientation();
    }
}*/
interface ScheduleProps {
    load: () => void;
    loading: boolean;
    refresh: () => void;
    schedule: ScheduleEntry[];
    event : any;
    orient: (event: any) => void;
    screen: any;
}
interface ScheduleState {
    // landscape: boolean;
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
    _orientationDidChange (orientation: Orientation.orientation) {
        this.setState({ landscape: orientation === 'LANDSCAPE' });
        // ScreenService.orient(orientation);
    }
    componentWillMount() {
    }
    componentDidMount() {
        this.props.load();
    }
    getScheduleForOrientation(screen: AppScreen) {
        const { schedule } = this.props;
        return this.props.screen.landscape
            ? <LandscapeSchedule schedule={schedule} screen={screen} />
            : <PortraitSchedule  schedule={schedule} screen={screen} />;
    }
    componentDidUpdate() {
        if (!this.props.loading) {
            Cache.set('schedule', this.props.schedule);
        }
    }
    onLayout = (event: any) => {
        this._orientationDidChange(
            event.nativeEvent.layout.height > event.nativeEvent.layout.width
                ? 'PORTRAIT'
                : 'LANDSCAPE'
        );
    }
    render() {
        if (this.props.loading) {
            return <Text>Loading</Text>;
        }
        return (
            <View onLayout={this.props.orient} style={{ flex: 1 }}>
                { this.getScheduleForOrientation(this.props.screen) }
            </View>
        );
    }
}
const mapStateToProps = (state: any) => ({
    schedule: selectors.schedule(state),
    loading: selectors.loading(state) ,
    screen: selectors.screen(state),
});
const mapDispatchToProps = (dispatch: (action: any) => void) => ({
    load: () => dispatch(actions.loadSchedule(null, null)),
    refresh: () => dispatch(actions.refreshScheduleIfNeeded(null, null)),
    orient: (event: any) => dispatch(actions.orientSchedule(event)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Schedule);

