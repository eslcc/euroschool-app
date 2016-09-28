/* eslint-disable import/no-extraneous-dependencies, no-underscore-dangle */

import fs from 'fs';
import path from 'path';
import register from 'babel-register';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Module from 'module';

const originalLoader = Module._load;
Module._load = function hookedLoader(request, parent, isMain) {
    // Don't load images, because no packager
    if (request.match(/.jpeg|.jpg|.png$/)) {
        return { uri: request };
    }

    return originalLoader(request, parent, isMain);
};

const originalFindPath = Module._findPath;
// If a load fails, try loading the .android.js suffixed version.
Module._findPath = function hookedFindPath(request, paths) {
    const result = originalFindPath(request, paths);

    if (result === false) {
        return originalFindPath(`${request}.android`, paths);
    }

    return result;
};

// Ignore all node_modules except these
const modulesToCompile = [
    'react-native',
    // 'react-native-material-kit',
    'react-native-router-flux',
    'react-native-orientation',
].map((moduleName) => new RegExp(`/node_modules/${moduleName}`));

const rcPath = path.join(__dirname, '..', '.babelrc');
const source = fs.readFileSync(rcPath).toString();
const config = JSON.parse(source);

config.ignore = (filename) => {
    if (!(/\/node_modules\//).test(filename)) {
        return false;
    }
    const matches = modulesToCompile.filter((regex) => regex.test(filename));
    const shouldIgnore = matches.length === 0;
    return shouldIgnore;
};

register(config);

global.__DEV__ = true; // eslint-disable-line
global.expect = chai.expect;
chai.use(chaiEnzyme());

require('react-native-mock/mock');
