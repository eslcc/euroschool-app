import * as React from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    Dimensions,
} from 'react-native';
const { Button, Spinner } = require('@shoutem/ui');
import { connect } from 'react-redux';
const autobind = require('autobind-decorator');
import { actions, selectors } from './state';

import GlobalStyles from '../../styles';

enum LoginState {
    WAITING,
    IN_PROGRESS,
    SUCCESS,
    FAILURE,
    NETWORK_ERROR,
}

const DumbLoginFailureIndicator = ({ display }: { display: boolean }) => {
    if (!display) {
        return null;
    }
    return (
        <Text style={GlobalStyles.core.error}>Something went wrong. Please check your email and password.</Text>
    );
};

const LoginFailureIndicator = connect(state => ({
    display: selectors.failed(state),
}))(DumbLoginFailureIndicator);

interface LoginProps {
    login: (email: string, password: string) => void;
    progress: string[];
}

interface LoginComponentState {
    email: string;
    password: string;
    loginState: LoginState;
}

export class Login extends React.Component<LoginProps, LoginComponentState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            email: 'polakoma@student.eursc.eu',
            password: '',
            loginState: LoginState.WAITING,
        };
    }

    onInputChange = (key: string) => {
        return (value: string) => {
            const state: any = Object.assign({}, this.state);
            state[key] = value;
            this.setState(state);
        };
    }

    login = () => {
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
                            placeholder="hunter2"
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

const mapStateToProps = (state: any) => ({
    progress: selectors.progress(state),
});

const mapDispatchToProps = (dispatch: (action: any) => void) => ({
    login: (email:string, password: string) => dispatch(actions.loginAttempt(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
