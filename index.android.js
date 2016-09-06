import { Component }   from 'react';
import { AppRegistry } from 'react-native';
import { createStore } from 'redux';
import { Provider }    from 'react-redux';

import MasterReducer   from './common/MasterReducer';
import MasterComponent from './common/MasterComponent';

class Euroschool extends Component
{
	render()
	{
		return
		(
			<Provider store = { createStore({ MasterReducer }) }>
				<MasterComponent />
			</Provider>
		)
	}
}

AppRegistry.registerComponent('Euroschool', () => Euroschool);