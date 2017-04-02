import { AppRegistry } from 'react-native';
import Euroschool from './common/src';
import Raven from 'raven-js';
require('raven-js/plugins/react-native')(Raven);

Raven
    .config('https://5152e18651ef46dcb19558ef01fa8c71@sentry.io/137177', { release: '0.0.1-020e6d575c879dd865ee24fa2bf55c52aa9ed1a7-23-dev' })
    .install();

AppRegistry.registerComponent('euroschoolApp', () => Euroschool);
