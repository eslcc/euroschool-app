import React, { Component, PropTypes } from 'react';
import {
    Text,
    View,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import Orientation from 'react-native-orientation';
import ScreenService from '../../lib/utils/screenService';

import * as actions from './actions';

import Day from './Day';

function PortraitSchedule({ schedule }) {
    const style = {
        position: 'absolute',
        top: 0,
        left: 0,
        height: ScreenService.getScreenSize().height,
        width: ScreenService.getScreenSize().width,
        flex: 1,
        flexDirection: 'row',
    };
    return (
        <View>
            <ScrollView
                horizontal
                pagingEnabled
                style={style}
            >
                {[1, 2, 3, 4, 5].map((num) =>
                    <Day key={`${num}-portrait`} schedule={schedule} day={num} />
                )}
            </ScrollView>
        </View>
    );
}

PortraitSchedule.propTypes = {
    schedule: PropTypes.array,
    landscape: PropTypes.bool,
};

function LandscapeSchedule({ schedule }) {
    return (
        <View>
        {[1, 2, 3, 4, 5].map((num) =>
            <Day key={`${num}-landscape`} schedule={schedule} day={num} landscape />
        )}
        </View>
    );
}

LandscapeSchedule.propTypes = {
    schedule: PropTypes.array,
    landscape: PropTypes.bool,
};

export class Schedule extends Component {
    static propTypes = {
        load: React.PropTypes.func,
        loading: React.PropTypes.bool,
        refresh: React.PropTypes.func,
    };

    constructor(props) {
        super(props);
        const initial = Orientation.getInitialOrientation();
        this.state = {
            schedule: null,
            landscape: initial === 'LANDSCAPE',
        };
    }

    componentDidMount() {
        if (this.props.loading) {
            this.props.load();
        } else {
            this.props.refresh();
        }
        Orientation.addOrientationListener((orientation) => {
            this.setState({ landscape: orientation === 'LANDSCAPE', key: Math.random() });
        });
    }

    getScheduleForOrientation() {
        const props = { schedule: this.props.schedule, landscape: this.state.landscape };
        return this.state.landscape ?
            <LandscapeSchedule {...props} /> :
            <PortraitSchedule {...props} />;
    }

    render() {
        return (
            <View>
            {(() => {
                if (this.props.loading) {
                    return (<Text>Loading</Text>);
                }

                return this.getScheduleForOrientation();
            })()}
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    schedule: state.schedule.schedule,
    loading: state.schedule.scheduleLoading,
});

const mapDispatchToProps = (dispatch) => ({
    load: (start, end) => dispatch(actions.loadSchedule(start, end)),
    refresh: (start, end) => dispatch(actions.refreshScheduleIfNeeded(start, end)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
