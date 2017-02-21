import { AppRegistry } from 'react-native';
import Euroschool from './common/src';
import Raven from 'raven-js';
require('raven-js/plugins/react-native')(Raven);

Raven
    .config('https://5152e18651ef46dcb19558ef01fa8c71@sentry.io/137177', { release: '0.0.1-68c4d13092212b68643402e927858d2b9c10ed46-44-dev' })
    .install();

AppRegistry.registerComponent('Euroschool', () => Euroschool);
