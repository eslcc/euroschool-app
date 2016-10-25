import React, { PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import { MKSpinner } from 'react-native-material-kit';
import { connect } from 'react-redux';

import { checkLogin } from './actions';
import styles from '../../styles';

const Startup = ({ loadApp }) => {
    loadApp();

    return (
        <View style={styles.core.center}>
            <Image source={require('./assets/StunningPicture.jpg')} />
            <Text>The app is loading, please wait...</Text>
            <MKSpinner />
        </View>
    );
};

Startup.propTypes = {
    loadApp: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
    loadApp: () => dispatch(checkLogin()),
});

export default connect(null, mapDispatchToProps)(Startup);
