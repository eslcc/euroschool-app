import React from 'react';
import {connect, Provider} from 'react-redux';
import {Router, Actions, Scene, ActionConst} from 'react-native-router-flux';
import {Text} from 'react-native';

import styles from '../styles';
import createStore from './Store';

import Startup from './Startup/component';
import Login from './Login/component';
import Drawer from './Drawer/component';
import Navbar from './Navbar/component';
import Schedule from './Schedule/component';
import Canteen from './Canteen/component';
import Settings from './Settings/component';
import Exercises from './Exercises/component';
import SingleExercise from './Exercises/SingleExercise';
import TransitionExplorer from './Devtools/TransitionExplorer';
import StateLogViewer from './Devtools/StateLogViewer';
import Absences from './Absences/component';
import TestShoutemBork from './Devtools/TestShoutemBork'

const TabIcon = (props) => (
    <Text style={{ color: props.selected ? 'red' : styles.colors.subText }}>
        {props.title}
    </Text>
);

TabIcon.propTypes = {
    selected: React.PropTypes.bool,
    title: React.PropTypes.string,
};

export const routes = Actions.create(
    <Scene key="root">
        <Scene key="startup" component={Startup} title="Startup" initial/>
        <Scene key="login" hideNavBar component={Login} type={ActionConst.REPLACE} title="Login"/>
        <Scene key="main" component={Drawer} navBar={Navbar} type={ActionConst.REPLACE}>
            <Scene
                key="tabs"
                tabs
                pressOpacity={1}
                tabBarStyle={{
                        backgroundColor: styles.colors.secondLevelBackground,
                    }}
            >
                <Scene key="schedule" hideNavBar component={Schedule} icon={TabIcon} title="Schedule"/>
                <Scene key="exercises" component={Exercises} icon={TabIcon} title="Exercises"/>
                <Scene key="absences" component={Absences} icon={TabIcon} title="Absent Teachers"/>
                <Scene key="balance" component={Canteen} icon={TabIcon} title="Balance"/>
            </Scene>
        </Scene>
        <Scene key="singleExercise" component={SingleExercise} title="BUG!"/>
        <Scene key="settings" component={Settings} hideTabBar type={ActionConst.PUSH} title="Settings"/>
        <Scene key="transitionExplorer" component={TransitionExplorer} title="Transition Explorer"/>
        <Scene key="stateLogViewer" component={StateLogViewer} title="State Log Viewer"/>
        <Scene key="testShoutemBork" component={TestShoutemBork} title="FUCK"/>
    </Scene>
);

const router = () => (
    <Router navBar={Navbar} scenes={routes}>
        {routes}
    </Router>
);

const RouterWithRedux = connect()(router);


// const {whyDidYouUpdate} = require('why-did-you-update')
// whyDidYouUpdate(React, { exclude: /(Navigation|MK|Touchable)/ })

global.store = createStore();


const Euroschool = () => (
    <Provider store={global.store}>
        <RouterWithRedux />
    </Provider>
);

export default Euroschool;
