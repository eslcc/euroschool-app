import {
    createRouter,
} from '@expo/ex-navigation';

import Startup from './Startup/component';
import Login from './Login/component';
import TabScreen from './TabScreen';
import Navbar from './Navbar/component';
import MoreScreen from './MoreScreen';
import Schedule from './Schedule/component';
import Canteen from './Canteen/component';
import Settings from './Settings/component';
import Exercises from './Exercises/component';
import SingleExercise from './Exercises/SingleExercise';
import StateLogViewer from './Devtools/StateLogViewer';
import Absences from './Absences/component';
import TestShoutemBork from './Devtools/TestShoutemBork'

export default createRouter(() => ({
    startup: () => Startup,
    login: () => Login,
    tabScreen: () => TabScreen,
    schedule: () => Schedule,
    exercises: () => Exercises,
    absences: () => Absences,
    canteen: () => Canteen,
    more: () => MoreScreen,
    settings: () => Settings,
    singleExercise: () => SingleExercise,
    stateLogViewer: () => StateLogViewer,
}));

