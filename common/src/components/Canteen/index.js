import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import { MKButton, MKColor, MKSpinner } from 'react-native-material-kit';
import * as actions from '../../ActionCreators';

// This is the bit where I wank off a horse to make debugging work.
// Except it actually breaks everything. Don't wank off horses, kids.

/* eslint-disable */
// const _XHR = GLOBAL.originalXMLHttpRequest ?
//     GLOBAL.originalXMLHttpRequest :
//     GLOBAL.XMLHttpRequest
//
// XMLHttpRequest = _XHR
/* eslint-enable */

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginTop: 64,
        flex: 1,
    }
});

class Balance extends Component {
    static propTypes = {
        loadBalance: PropTypes.func,
        loaded: PropTypes.bool,
        loading: PropTypes.bool,
        loadFailed: PropTypes.bool,
        balance: PropTypes.string,
        refreshBalanceInBackground: PropTypes.func,
    };

    componentDidMount() {
        if(this.props.balance !== '') {
            this.props.refreshBalanceInBackground();
        } else {
            this.props.loadBalance();
        }
    }

    render() {
        if (this.props.loaded) {
            return <Text style={styles.container}>{this.props.loaded ? this.props.balance : 'FOO'}</Text>;
        } else if (this.props.loading) {
            return <MKSpinner style={styles.container} />
        }
        const Button = MKButton.button()
            .withBackgroundColor(MKColor.Red)
            .withText('RETRY')
            .withOnPress(this.props.loadBalance)
            .build();
        return (
            <View style={styles.container}>
                <Text>Could not access balance.</Text>
                <Text>Please make sure you have set your credentials in settings.</Text>
                <Button />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    balance: state.canteen.balance,
    loading: state.canteen.loadInProgress,
    loaded: state.canteen.loaded,
    loadFailed: state.canteen.loadFailed,
});

const mapDispatchToProps = (dispatch) => ({
    loadBalance: () => dispatch(actions.getBalance()),
    refreshBalanceInBackground: () => dispatch(actions.refreshBalanceInBackground()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Balance);
