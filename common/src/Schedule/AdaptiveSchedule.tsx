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

import Day from './Day';


function PortraitSchedule({ schedule }: { schedule: ScheduleEntry[] }) {
    const style = {
        height: ScreenService.getScreenSize().height,
        width: ScreenService.getScreenSize().width ,
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
                    <Day key={`${num}-portrait`} schedule={schedule} day={num} landscape={false}/>
                )}
            </ScrollView>
        </View>
    );
}
function LandscapeSchedule({ schedule }: { schedule: ScheduleEntry[] }) {
    return (
        <View style={GlobalStyles.schedule.landscapeScheduleContainer}>
            {/* tslint:disable-next-line jsx-no-multiline-js */}
            {[1, 2, 3, 4, 5].map(num =>
                <Day key={`${num}-landscape`} schedule={schedule} day={num} landscape/>
            )}
        </View>
    );
}

interface AdaptiveScheduleProps {
    schedule: ScheduleEntry[];
}

interface AdaptiveScheduleState {
    landscape: boolean;
}

export default class AdaptiveSchedule extends  Component<AdaptiveScheduleProps, AdaptiveScheduleState> {

    constructor(props: AdaptiveScheduleProps) {
        super(props);
        const dimens = Dimensions.get('window');
        this.state = {
            landscape: dimens.width > dimens.height,
        };
        this.update = this.update.bind(this);
    }

    getScheduleForOrientation() {
        const { schedule } = this.props;
        return this.state.landscape
            ? <LandscapeSchedule schedule={schedule} />
            : <PortraitSchedule  schedule={schedule} />;
    }

    update(event: any) {
        console.warn(event);
        this.setState({ landscape: event.nativeEvent.layout.height < event.nativeEvent.layout.width });
    }
    render() {
        console.warn(this.state.landscape);
        let daySuffix = this.state.landscape ? '-landscape' : '-portrait';
        return(
            <ScrollView horizontal pagingEnabled={!this.state.landscape} scrollEnabled={!this.state.landscape}
                        onLayout={this.update} style={this.state.landscape ? GlobalStyles.schedule.landscapeScheduleContainer :
                GlobalStyles.schedule.portraitScheduleContainer}>
                {/* tslint:disable-next-line jsx-no-multiline-js */}
                {[1, 2, 3, 4, 5].map(num =>
                    <Day key={`${num}`+daySuffix} schedule={this.props.schedule} day={num} landscape={this.state.landscape}/>
                )}
            </ScrollView>
        )
    }
}
