import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { connect, Provider } from 'react-redux';
import { Actions, Scene, Router, ActionConst } from 'react-native-router-flux';

import createStore from './Store';
import Startup from './components/Startup';
import Login from './components/Login';
import Drawer from './components/Drawer';
import Schedule from './components/Schedule';
import Canteen from './components/Canteen';
import Settings from './components/Settings';

const RouterWithRedux = connect()(Router);

const TabIcon = (props) => (
  <Text
      style={{ color: props.selected ? 'red' : 'black' }}
  >
    {props.title}
  </Text>
);

const scenes = Actions.create(
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
        <RouterWithRedux scenes={scenes} />
    </Provider>
);

export default Euroschool;
