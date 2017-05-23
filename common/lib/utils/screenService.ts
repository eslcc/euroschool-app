// Workaround for Dimensions issue on Android.
// Source: https://github.com/facebook/react-native/issues/8587#issuecomment-231595674

import { Dimensions, NativeModules } from 'react-native';
// import { orientation, specificOrientation } from "react-native-orientation";

var Orientation = require('react-native-orientation-listener');

interface Screen {
    width: number;
    height: number;
}

let screen: Screen = {
    width: -1,
    height: -1,
};

// var currentOrientation:string = "";

const setScreenSize = (currentOrientation:number): void => {
    // setTimeout(function () {
    console.warn('orient:'+currentOrientation);
    // NativeModules.OrientationListener.getOrientation(console.warn());
    const { height, width } = Dimensions.get('window');
    const min = Math.min(height, width);
    const max = Math.max(height, width);
    const isLandscape = currentOrientation !== 0;
    // screen = {
    //     height: isLandscape ? min : max,
    //     width: isLandscape ? max : min,
    // };
    screen = {
        height: height,
        width: width,
    };
    // }, 1000);

};




export default {
    getScreenSize: (): Screen => screen,
    setScreenSize: (orientation: number) => setScreenSize(orientation),
}
