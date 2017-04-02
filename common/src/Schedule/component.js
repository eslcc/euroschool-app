import React, { Component, PropTypes } from 'react';
import {
    Text,
    View,
    ScrollView ,
} from 'react-native';
import { connect } from 'react-redux';
import Orientation from 'react-native-orientation';
import ScreenService from '../../lib/utils/screenService';
import Cache from '../../lib/utils/cache';

import GlobalStyles from '../../styles';

import * as actions from './actions';
import * as selectors from './selectors';

import Day from './Day';

function PortraitSchedule({ schedule }) {
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
                {[1, 2, 3, 4, 5].map(num =>
                    <Day key={`${num}-portrait`} schedule={schedule} day={num}/>
                )}
            </ScrollView>
        </View>
    );
}

PortraitSchedule.propTypes = {
    schedule: PropTypes.array,
    landscape: PropTypes.bool ,
};

function LandscapeSchedule({ schedule }) {
    return (
        <View>
            {[1, 2, 3, 4, 5].map((num) =>
                <Day key={`${num}-landscape`} schedule={schedule} day={num} landscape/>
            )}
        </View>
    );
}

LandscapeSchedule.propTypes = {
    schedule: PropTypes.array,
    landscape: PropTypes.bool ,
};

class Schedule extends Component {
    static propTypes = {
        load: React.PropTypes.func,
        loading: React.PropTypes.bool,
        refresh: React.PropTypes.func,
        schedule: React.PropTypes.array ,
    };

    static route = {
        navigationBar: {
            visible: false ,
        },
    };

    constructor(props) {
        super(props);
        const initial = Orientation.getInitialOrientation();
        this.state = {
            schedule: null,
            landscape: initial === 'LANDSCAPE' ,
        };
    }

    componentDidMount() {
        if (this.props.loading) {
            this.props.load();
        } else {
            //this.props.refresh();
        }

        Orientation.addOrientationListener((orientation) => {
            this.setState({ landscape: orientation === 'LANDSCAPE', key: Math.random() });
        });
    }

    getScheduleForOrientation() {
        const props = { schedule: this.props.schedule, landscape: this.state.landscape };
        return this.state.landscape
            ? <LandscapeSchedule {...props} />
            : <PortraitSchedule {...props} />;
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

const mapStateToProps = (state) => ({
    schedule: selectors.schedule(state),
    loading: selectors.loading(state) ,
});

const mapDispatchToProps = (dispatch) => ({
    load: (start, end) => dispatch(actions.loadSchedule(start, end)),
    refresh: (start, end) => dispatch(actions.refreshScheduleIfNeeded(start, end)) ,
});

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
