import React from 'react';
import { connect, Provider } from 'react-redux';
import { Actions, Scene, Router } from 'react-native-router-flux';

import createStore from './Store';
import Startup from './components/Startup';
import Login from './components/Login';
import Home from './components/Home';

const RouterWithRedux = connect()(Router);

const scenes = Actions.create(
    <Scene key = "root">
        <Scene key = "startup" component = {Startup} title = "Startup" initial />
        <Scene key = "login" component = {Login} title = "Login" />
        <Scene key = "home" component = {Home} title = "Home" />
    </Scene>
);

const Euroschool = () => (
    <Provider store = {createStore()}>
        <RouterWithRedux scenes = {scenes} />
    </Provider>
);

export default Euroschool;
