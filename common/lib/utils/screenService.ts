// Workaround for Dimensions issue on Android.
// Source: https://github.com/facebook/react-native/issues/8587#issuecomment-231595674

import { Dimensions } from 'react-native';

interface Screen {
    width: number;
    height: number;
}

let screen: Screen = {
    width: -1,
    height: -1,
};

const setScreenSize = (currentOrientation:string): void => {
    const { height, width } = Dimensions.get('window');
    screen = {
        height: height,
        width: width,
    };

};




export default {
    getScreenSize: (): Screen => screen,
    setScreenSize: (orientation:string)  => setScreenSize(orientation),
};