import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { MKButton, MKProgress, MKColor } from 'react-native-material-kit';
import { connect } from 'react-redux';
import * as actions from '../../ActionCreators';

const windowSize = Dimensions.get('window');

const loginStates = {
    WAITING: 0,
    IN_PROGRESS: 1,
    SUCCESS: 2,
    FAILURE: 3,
    NETWORK_ERROR: 4,
};

const styles = StyleSheet.create({
    bg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: windowSize.width,
        height: windowSize.height,
    },
    mainText: {
        fontSize: 48,
    },
    subheading: {
        fontSize: 30,
    },
    greyFont: {
        color: '#D8D8D8',
    },
    whiteFont: {
        color: '#FFF',
    },
    failureText: {
        color: '#f44336',
    },
});

const DumbLoginFailureIndicator = ({ display }) => {
    if (!(display)) return null;
    return (
    <Text style={styles.failureText}>Something went wrong. Please check your email and password.</Text>
  );
};

const LoginFailureIndicator = connect((state) => ({
    display: state.login.failed,
}))(DumbLoginFailureIndicator);

class Login extends Component {
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
        const LoginButton = MKButton
        .coloredButton()
        .withBackgroundColor(MKColor.Blue)
        .withText('LOG IN')
        .withOnPress(() => this.props.login(this.state.email, this.state.password))
        .build();
        return (
            <View>
                <Image source={require('../../../assets/images/LoginBackdrop.png')} style={styles.bg} />
                <View>
                    <Text style={[styles.mainText, styles.whiteFont]}>Hello.</Text>
                    <Text style={[styles.subheading, styles.greyFont]}>Please log in with your SMS account.</Text>
                    <View style={styles.inputs}>
                        <TextInput
                            placeholder="Email"
                            style={styles.whiteFont}
                            placeholderTextColor="#FFF"
                            onChangeText={(text) => this.onInputChange('email', text)}
                            // value={this.state.username}
                        />
                        <TextInput
                            secureTextEntry
                            style={styles.whiteFont}
                            placeholder="Password"
                            placeholderTextColor="#FFF"
                            onChangeText={(text) => this.onInputChange('password', text)}
                            // value={this.state.password}
                        />
                        <LoginButton />

                        {
                            (this.state.loginState === loginStates.IN_PROGRESS) &&
                                <MKProgress.Indeterminate />
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

const mapStateToProps = () => ({

});

const mapDispatchToProps = (dispatch) => ({
    login: (email, password) => dispatch(actions.doLogin(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
