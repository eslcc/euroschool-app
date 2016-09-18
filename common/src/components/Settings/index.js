import React, { Component, PropTypes } from 'react';
import {
    Text,
    ListView,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { MKTextField } from 'react-native-material-kit';
import * as actions from '../../ActionCreators';
import Settings, { categories as settingCategories } from '../../constants/settings';

const styles = StyleSheet.create({
    view: {
        marginTop: 54,
        marginHorizontal: 16,
    },
    header: {
        paddingVertical: 8,
        height: 32,
        fontWeight: '700',
    },
});

const dumbRenderRow = ({ row, change }) => {
    switch (row.type) {
        case 'string':
            return (
                <MKTextField
                    placeholder={row.label}
                    secureTextEntry={row.secure}
                    onChangeText={text => change(row.key, text)}
                />
            );
        default:
            throw new Error(`Unrecognised setting type ${row.type}`);
    }
};

const mapDispatchToProps = (dispatch) => ({
    change: (key, value) => dispatch(actions.settingChanged(key, value)),
});

const Row = connect(null, mapDispatchToProps)(dumbRenderRow);

const renderHeader = (sectionData, category) =>
    <Text style={styles.header}>{category}</Text>;


class SettingsView extends Component {
    static PropTypes = {
        settings: PropTypes.object,
        change: PropTypes.func,
    }

    constructor(props) {
        super(props);
        const data = Object.assign({}, Settings);
        const { settings } = props;
        Object.keys(Settings).forEach(item => {
            const value = settings[item];
            if (value) {
                data[item].value = value;
            }
        });
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });
        this.state = {
            dataSource: ds.cloneWithRowsAndSections(settingCategories()),
        };
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={row => <Row row={row} />}
                renderSectionHeader={renderHeader}
                style={styles.view}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(SettingsView);
