import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import Orientation from "react-native-orientation";

import Cache from '../../lib/utils/cache';
import { ScheduleEntry } from '../../lib/msm/schedule';

import GlobalStyles from '../../styles';

import { actions, selectors } from './state';

import Day from './Day';


function PortraitSchedule({ schedule, screen }: { schedule: ScheduleEntry[], screen:AppScreen }) {
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
                    <Day key={`${num}-portrait`} schedule={schedule} day={num} screen={screen} />
                )}
            </ScrollView>
        </View>
    );
}
function LandscapeSchedule({ schedule, screen }: { schedule: ScheduleEntry[], screen:AppScreen }) {
    return (
        <View style={GlobalStyles.schedule.landscapeScheduleContainer}>
            {/* tslint:disable-next-line jsx-no-multiline-js */}
            {[1, 2, 3, 4, 5].map(num =>
                <Day key={`${num}-landscape`} schedule={schedule} day={num} screen={screen}/>
            )}
        </View>
    );
}
interface AdaptiveScheduleProps {
    schedule: ScheduleEntry[];
    screen: AppScreen;
}
interface AdaptiveScheduleState { }

class AdaptiveSchedule extends  Component<AdaptiveScheduleProps, AdaptiveScheduleState> {
    constructor(props: AdaptiveScheduleProps) {
        super(props);
    }
    getScheduleForOrientation() {
        const { schedule } = this.props;
        return this.props.screen.landscape
            ? <LandscapeSchedule schedule={schedule} screen={this.props.screen} />
            : <PortraitSchedule  schedule={schedule} screen={this.props.screen}/>;
    }
    render() {
        return this.getScheduleForOrientation();
    }
}

export interface AppScreen {
    width: number;
    height: number;
    landscape: boolean;
}

// let screen: AppScreen = {
//     width: -1,
//     height: -1,
//     landscape: false,
// };

interface ScheduleProps {
    load: () => void;
    loading: boolean;
    refresh: () => void;
    schedule: ScheduleEntry[];
    event : any;
}
interface ScheduleState {
    screen: AppScreen;
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
            screen: {
                width: dimens.width,
                height: dimens.height,
                landscape: dimens.width > dimens.height,
            }
        };
    }



    _updateValues (currentOrientation:string) {
        const { height, width } = Dimensions.get('window');
        this.setState({
            screen: {
                height: height,
                width: width,
                landscape: width > height,
            }
        });

    };
    _orientationDidChange (orientation: Orientation.orientation) {
        this._updateValues(orientation);

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
        const { schedule } = this.props;
        return (
            <View onLayout={this.onLayout} style={{ flex: 1 }}>
                <AdaptiveSchedule screen={this.state.screen} schedule={schedule} />
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

