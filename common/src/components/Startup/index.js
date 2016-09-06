import React, { PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import { MKSpinner } from 'react-native-material-kit';
import { connect } from 'react-redux';

import { loadApp as doLoadApp } from '../../ActionCreators';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const Startup = ({ loadApp }) => {
    loadApp();

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/images/StunningPicture.jpg')} />
            <Text>The app is loading, please wait...</Text>
            <MKSpinner />
        </View>
    );
};

Startup.propTypes = {
    loadApp: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
    loadApp: () => dispatch(doLoadApp()),
});

export default connect(null, mapDispatchToProps)(Startup);
