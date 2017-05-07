import React, { Component, PropTypes } from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    StyleSheet,
    Dimensions,
} from 'react-native';
const { Button, Spinner } = require('@shoutem/ui');
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { actions } from './state';

import GlobalStyles from '../../styles';

const windowSize = Dimensions.get('window');

enum LoginState {
    WAITING,
    IN_PROGRESS,
    SUCCESS,
    FAILURE,
    NETWORK_ERROR,
}

const DumbLoginFailureIndicator = ({ display }) => {
    if (!display) {
        return null;
    }
    return (
        <Text style={GlobalStyles.core.error}>Something went wrong. Please check your email and password.</Text>
    );
};

const LoginFailureIndicator = connect(state => ({
    display: state.login.failed,
}))(DumbLoginFailureIndicator);

interface LoginProps {
    login: (email: string, password: string) => void;
}

interface LoginComponentState {
    email: string;
    password: string;
    loginState: LoginState;
}

export class Login extends Component<LoginProps, LoginComponentState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            email: 'polakoma@student.eursc.eu',
            password: 'hunter2',
            loginState: LoginState.WAITING,
        };
    }

    @autobind
    onInputChange(key: string) {
        return value => {
            const state = Object.assign({}, this.state);
            state[key] = value;
            this.setState(state);
        };
    }

    @autobind
    login() {
        this.props.login(this.state.email, this.state.password);
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
                            onChangeText={this.onInputChange('email')}
                            returnKeyType="next"
                            keyboardType="email-address"
                            value={this.state.email}
                        />
                        <TextInput
                            secureTextEntry
                            placeholder="Password"
                            placeholderTextColor="#FFF"
                            onChangeText={this.onInputChange('password')}
                            returnKeyType="go"
                            value={this.state.password}
                        />
                        <Button
                            styleName="dark"
                            onPress={this.login}
                        >
                            <Text>LOG IN</Text>
                        </Button>

                        {(this.state.loginState === LoginState.IN_PROGRESS) && <Spinner />}

                        <LoginFailureIndicator />
                    </View>
                </View>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    login: (email, password) => dispatch(actions.loginAttempt(email, password)),
});

export default connect(null, mapDispatchToProps)(Login);
