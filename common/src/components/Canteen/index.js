import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
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

class Balance extends Component {
    static propTypes = {
        loadBalance: PropTypes.func,
        loaded: PropTypes.bool,
        loading: PropTypes.bool,
        balance: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            balance: '',
        };
    }

    componentDidMount() {
        this.props.loadBalance();
    }

    render() {
        return <Text>{this.props.loaded ? this.props.balance : 'FOO'}</Text>;
    }
}

const mapStateToProps = (state) => ({
    balance: state.canteen.balance,
    loading: state.canteen.loadInProgress,
    loaded: state.canteen.loaded,
});

const mapDispatchToProps = (dispatch) => ({
    loadBalance: () => dispatch(actions.getBalance()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Balance);
