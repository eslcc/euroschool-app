import React from 'react';
import { connect, Provider } from 'react-redux';
import { Router, Actions, Scene, ActionConst } from 'react-native-router-flux';
import { Text } from 'react-native';

import createStore from './Store';

import Startup from './Startup/component';
import Login from './Login/component';
import Drawer from './Drawer/component';
import Schedule from './Schedule/component';
import Canteen from './Canteen/component';
import Settings from './Settings/component';

const RouterWithRedux = connect()(Router);

const TabIcon = (props) => (
    <Text
        style={{ color: props.selected ? 'red' : 'black' }}
    >
        {props.title}
    </Text>
);

TabIcon.propTypes = {
    selected: React.PropTypes.bool,
    title: React.PropTypes.string,
};

const routes = Actions.create(
    <Scene key="root">
        <Scene key="startup" component={Startup} title="Startup" initial />
        <Scene key="login" component={Login} type={ActionConst.REPLACE} title="Login" />
        <Scene key="main" component={Drawer} type={ActionConst.REPLACE}>
            <Scene
                key="tabs"
                tabs
                pressOpacity={1}
                tabBarStyle={{
                    backgroundColor: '#eee',
                }}
            >
                <Scene key="schedule" hideNavBar component={Schedule} icon={TabIcon} title="Schedule" />
                <Scene key="balance" hideNavBar component={Canteen} icon={TabIcon} title="Balance" />
            </Scene>
        </Scene>
        <Scene key="settings" component={Settings} hideTabBar type={ActionConst.PUSH} title="Settings" />
    </Scene>
);

const Euroschool = () => (
    <Provider store={createStore()}>
        <RouterWithRedux scenes={routes} />
    </Provider>
);

export default Euroschool;
