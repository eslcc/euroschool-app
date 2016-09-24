import React, { Component, PropTypes } from 'react';
import {
	View,
	Text,
	ListView,
    StyleSheet,
} from 'react-native';
import { getTheme } from 'react-native-material-kit';
import { connect } from 'react-redux';
import * as actions from '../../ActionCreators';

const theme = getTheme();

const absences = [
    'M. Fuckface, N.'
];

const styles = StyleSheet.create({
    list: {
        marginTop: 54,
    },
});

class Absences extends Component {
    static PropTypes = {
        date: PropTypes.array,
        loaded: PropTypes.bool,
        loading: PropTypes.bool,
        load: PropTypes.func,
    }

    constructor() {
        super();
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
    }

    componentWillMount() {
        if (!this.props.loaded) {
            this.props.load();
        }
    }

    renderRow(row) {
        return (
            <View style={theme.cardStyle}>
                <Text style={theme.cardContentStyle}>{row}</Text>
            </View>
        )
    }

    render() {
        if(this.props.loaded) {
            return (
                <ListView
                    style={styles.list}
                    dataSource={this.ds.cloneWithRows(this.props.data)}
                    renderRow={this.renderRow}
                />
            );
        } else if(this.props.loading) {
            return <Text style={styles.list}>LOADING</Text>;
        } else {
            return <Text style={styles.list}>wat</Text>;
        }
    }
}

const mapStateToProps = (state) => ({
    data: state.absences.absences,
    loaded: state.absences.loaded,
    loading: state.absences.loading,
});

const mapDispatchToProps = (dispatch) => ({
    load: dispatch(actions.getAbsences()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Absences);
