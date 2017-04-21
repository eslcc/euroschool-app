import React, { PropTypes } from 'react';
import {
    Text,
    View,
    Image,
} from 'react-native';
import { connect } from 'react-redux';

import { checkLogin } from './actions';
import styles from '../../styles'; // eslint-disable-line

export class Startup extends React.Component {

    componentDidMount() {
        this.props.loadApp();
    }

    render() {
        return (
            <View style={styles.core.screenContainer}>
                <Image source={require('./assets/StunningPicture.jpg')} />
                <Text>The app is loading, please wait...</Text>
            </View>
        );
    }
}

Startup.propTypes = {
    loadApp: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
    loadApp: () => dispatch(checkLogin()),
});

export default connect(null, mapDispatchToProps)(Startup);
