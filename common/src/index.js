import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { connect, Provider } from 'react-redux';
import { Actions, Scene, Router, ActionConst } from 'react-native-router-flux';

import createStore from './Store';
import Startup from './components/Startup';
import Login from './components/Login';
import Home from './components/Home';
import Schedule from './components/Schedule';
import Canteen from './components/Canteen';

const RouterWithRedux = connect()(Router);

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#eee',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#ddd',
    },
});

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
        <Scene
            key="main"
            tabs
            pressOpacity={1}
            tabBarStyle={{
                backgroundColor: '#eee',
            }}
            type={ActionConst.REPLACE}
        >
            <Scene key="schedule" hideNavBar component={Schedule} icon={TabIcon} title="Schedule" />
            <Scene key="home" hideNavBar component={Canteen} icon={TabIcon} title="Balance" />
        </Scene>
    </Scene>
);

const Euroschool = () => (
    <Provider store={createStore()}>
        <RouterWithRedux scenes={scenes} />
    </Provider>
);

export default Euroschool;
