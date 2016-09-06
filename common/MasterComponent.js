import React from 'react';
import { Actions, Scene, Router } from 'react-native-router-flux';

import Startup from './components/Startup';
import Login   from './components/Login';
import Home    from './components/Home';

const scenes = Actions.create
(
  <Scene key = "root">
	<Scene key = "startup" component = { Startup } title="Startup" initial = { true } />
    <Scene key = "login"   component = { Login }   title="Login"/>
    <Scene key = "home"    component = { Home }    title="Home" />
  </Scene>
);

export default class MasterComponent extends React.Component
{
	render()
	{
		return (<Router scenes = { scenes } />)
	}
}