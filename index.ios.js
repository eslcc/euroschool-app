/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Startup from './common/Startup/Startup';

function Euroschool() {
  return (
    <Startup />
  );
}


AppRegistry.registerComponent('Euroschool', () => Euroschool);
