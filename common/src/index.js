import React from 'react';
import { connect, Provider } from 'react-redux';
import { Actions, Scene, Router } from 'react-native-router-flux';

import createStore from './Store';
import Startup from './components/Startup';
import Login from './components/Login';
import Home from './components/Home';

const RouterWithRedux = connect()(Router);
const StartupWithRedux = connect()(Startup);
const LoginWithRedux = connect()(Login);
const HomeWithRedux = connect()(Home);

const scenes = Actions.create(
    <Scene key = "root">
        <Scene key = "startup" component = {StartupWithRedux} title = "Startup" initial />
        <Scene key = "login" component = {LoginWithRedux} title = "Login" />
        <Scene key = "home" component = {HomeWithRedux} title = "Home" />
    </Scene>
);

const Euroschool = () => (
    <Provider store = {createStore()}>
        <RouterWithRedux scenes = {scenes} />
    </Provider>
);

export default Euroschool;
