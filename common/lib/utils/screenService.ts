// Workaround for Dimensions issue on Android.
// Source: https://github.com/facebook/react-native/issues/8587#issuecomment-231595674

import { Dimensions } from 'react-native';
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

const setScreenSize = (orientation: string): void => {
    console.warn('orient'+orientation);
    const { height, width } = Dimensions.get('window');
    const min = Math.min(height, width);
    const max = Math.max(height, width);
    const isLandscape = orientation === 'LANDSCAPE';
    screen = {
        height: isLandscape ? min : max,
        width: isLandscape ? max : min,
    };
};

const update = (): void => {
    Orientation.getOrientation(
        (device:any, orientation:any) => {
            // console.error(device, orientation);
            console.warn('o: '+orientation);
            setScreenSize(orientation);
        }
    );
};

// Orientation.addListener(update);




export default {
    getScreenSize: (): Screen => screen,
    update: (): void => update(),
    setScreenSize: (orientation:any): void  => setScreenSize(orientation),
};
