// Workaround for Dimensions issue on Android.
// Source: https://github.com/facebook/react-native/issues/8587#issuecomment-231595674

import { Dimensions } from 'react-native';

interface Screen {
    width: number;
    height: number;
    landscape: boolean;
}

let screen: Screen = {
    width: -1,
    height: -1,
    landscape: false,
};

const setScreenSize = (currentOrientation:string): void => {
    const { height, width } = Dimensions.get('window');
    screen = {
        height: height,
        width: width,
        landscape: width > height,
    };

};




export default {
    getScreenInfo: (): Screen => screen,
    orient: (orientation:string)  => setScreenSize(orientation),
};