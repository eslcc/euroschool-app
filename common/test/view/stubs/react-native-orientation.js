/* eslint-disable import/no-extraneous-dependencies */

let orientation = 'PORTRAIT';

const listeners = [];

function fireListeners() {
    listeners.forEach(listener => listener(orientation));
}

export default {
    getInitialOrientation: () => orientation,
    addOrientationListener: (listener) => listeners.push(listener),
    dev_setOrientation: (orIn, fireChange = true) => {
        orientation = orIn;
        if (fireChange) {
            fireListeners();
        }
    },
    dev_reset: () => {
        orientation = 'PORTRAIT';
        fireListeners();
        listeners.length = 0;
    },
};
