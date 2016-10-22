import React, { Component } from 'react';
import {
    DrawerLayoutAndroid,
    ListView,
    Text,
    StyleSheet,
    TouchableNativeFeedback,
    View,
   } from 'react-native';
import { Actions, DefaultRenderer } from 'react-native-router-flux';
import { MKButton, MKColor } from 'react-native-material-kit';

const items = [
    {
        type: 'button',
        label: 'Home',
        click: () => Actions.main(),
    },
    {
        type: 'button',
        label: 'Schedule',
        click: () => Actions.schedule(),
    },
    {
        type: 'button',
        label: 'Exercises',
        click: () => Actions.exercises(),
    },
    {
        type: 'button',
        label: 'Absent Teachers',
        click: () => Actions.absences(),
        nyi: true,
    },
    {
        type: 'button',
        label: 'News',
        click: () => Actions.news(),
        nyi: true,
    },
    {
        type: 'button',
        label: 'Canteen card',
        click: () => Actions.balance(),
    },
    {
        type: 'button',
        label: 'Settings',
        click: () => Actions.settings(),
    },
];

const styles = StyleSheet.create({
    header: {
        height: 56,
        flex: 1,
        paddingVertical: 8,
        marginLeft: 16,
        fontWeight: 'bold',
        color: '#212121',
    },
    button: {
        flex: 1,
        height: 48,
        marginLeft: 4,
        paddingVertical: 8,
    },
    buttonText: {
        color: '#212121',
        left: 72,
    },
    view: {
        marginTop: 56,
    },
    nyi: {
        fontWeight: 'bold',
        color: MKColor.Red,
    }
});

let drawer;

function renderRowForType(row) {
    const click = () => {
        row.click();
        drawer.closeDrawer();
    };
    switch (row.type) {
        case 'header':
            return <Text style={styles.header}>{row.text}</Text>;
        case 'button': {
            const nyi = row.nyi ? <Text style={styles.nyi}>NYI - expect crash if you tap me</Text> : null;
            return (
                <MKButton
                    style={styles.button}
                    onPress={click}
                >
                    <View><Text style={styles.buttonText}>{row.label}</Text>{nyi}</View>
                </MKButton>
            );
        }
        default:
            return <Text>{JSON.stringify(row)}</Text>;
    }
}

const renderRow = (row) => renderRowForType(row);

class NavigationView extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(items),
        };
    }

    render() {
        return (
            <ListView
                style={styles.view}
                dataSource={this.state.dataSource}
                renderRow={row => renderRow(row)}
            />
        );
    }
}

export default function ({ navigationState, onNavigate }) {
    const state = navigationState;
    const children = state.children;
    return (
        <DrawerLayoutAndroid
            drawerWidth={300}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={() => <NavigationView />}
            ref={c => { drawer = c; }}
        >
            <DefaultRenderer navigationState={children[0]} onNavigate={onNavigate} />
        </DrawerLayoutAndroid>
    );
}
