import React, {
  Component,
  PropTypes,
} from 'react';

import {
  ListView,
  Text,
  TouchableHighlight,
  Modal,
  View,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';

import GlobalStyles from '../../styles';

export class StateLogViewer extends Component {

    static propTypes = {
        log: PropTypes.arrayOf(PropTypes.shape({
            action: PropTypes.object,
            diff: PropTypes.object,
        })),
    }

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(props.log),
            modalItem: null,
        };
    }

    openModal(item) {
        this.setState({
            ...this.state,
            modalItem: item,
        });
    }

    closeModal() {
        this.setState({
            ...this.state,
            modalItem: null,
        });
    }

    renderRow(row) {
        return (
            <TouchableHighlight onPress={() => this.openModal(row)}>
                <Text>{row.action.type}</Text>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={GlobalStyles.core.screenContainerNoTabs}>
                <ListView
                    style={GlobalStyles.core.fill}
                    dataSource={this.state.dataSource}
                    renderRow={row => this.renderRow(row)}
                />
                <Modal
                    animationType="slide"
                    visible={this.state.modalItem !== null}
                >
                    <ScrollView style={GlobalStyles.core.fill}>
                        <TouchableHighlight onPress={() => this.closeModal()}>
                            <Text>close</Text>
                        </TouchableHighlight>
                        <Text style={GlobalStyles.core.textMargin}>
                            {JSON.stringify(this.state.modalItem !== null ? this.state.modalItem.action : null)}
                        </Text>
                        <Text style={GlobalStyles.core.textMargin}>
                            {JSON.stringify(this.state.modalItem !== null ? this.state.modalItem.diff : null)}
                        </Text>
                    </ScrollView>
                </Modal>
            </View>
        );
    }

}

const mapStateToProps = state => ({
    log: state.devtools.log,
});

export default connect(mapStateToProps)(StateLogViewer);
