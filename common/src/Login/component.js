import React, {Component, PropTypes} from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { Button, Spinner } from '@shoutem/ui';
import {connect} from 'react-redux';
import * as actions from './actions';

import GlobalStyles from '../../styles';

const windowSize = Dimensions.get('window');

const loginStates = {
    WAITING: 0,
    IN_PROGRESS: 1,
    SUCCESS: 2,
    FAILURE: 3,
    NETWORK_ERROR: 4,
};

const DumbLoginFailureIndicator = ({display}) => {
    if (!(display)) {
        return null;
    } else {
        return (
            <Text style={GlobalStyles.core.error}>Something went wrong. Please check your email and password.</Text>
        );
    }
};

DumbLoginFailureIndicator.propTypes = {
    display: PropTypes.bool,
};

const LoginFailureIndicator = connect((state) => ({
    display: state.login.failed,
}))(DumbLoginFailureIndicator);

export class Login extends Component {
    constructor(props: object) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loginState: 0,
        };
    }

    onInputChange(key: string, value: string) {
        const state = Object.assign({}, this.state);
        state[key] = value;
        this.setState(state);
    }

    render() {
        return (
            <View>
                <Image source={require('./assets/LoginBackdrop.png')} style={GlobalStyles.login.background}/>
                <View>
                    <Text style={GlobalStyles.core.mainText}>Hello.</Text>
                    <Text style={GlobalStyles.login.secondaryText}>Please log in with your SMS account.</Text>
                    <View>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#FFF"
                            onChangeText={text => this.onInputChange('email', text)}
                            returnKeyType="next"
                            keyboardType="email-address"
                            // value={this.state.username}
                        />
                        <TextInput
                            secureTextEntry
                            placeholder="Password"
                            placeholderTextColor="#FFF"
                            onChangeText={text => this.onInputChange('password', text)}
                            returnKeyType="go"
                            // value={this.state.password}
                        />
                        <Button styleName="dark"
                                onPress={() => this.props.login(this.state.email, this.state.password)}
                        >
                            <Text>LOG IN</Text>
                        </Button>

                        {
                            (this.state.loginState === loginStates.IN_PROGRESS) &&
                            <Spinner />
                        }

                        <LoginFailureIndicator />

                        {/* // TODO
                         (this.state.loginState === loginStates.NETWORK_ERROR) &&
                         <Text style = {styles.failureText}>Something went wrong. Please check your Internet connectivity.</Text>
                         */}
                    </View>
                </View>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    login: (email, password) => dispatch(actions.loginAttempt(email, password)),
});

export default connect(null, mapDispatchToProps)(Login);
