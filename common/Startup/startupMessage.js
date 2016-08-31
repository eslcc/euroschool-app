import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { MKSpinner } from 'react-native-material-kit';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class StartupMessage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/images/StunningPicture.jpg')} />
        <Text>The app is loading, please wait...</Text>
        <MKSpinner />
      </View>
    );
  }
}
