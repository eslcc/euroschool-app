import * as React from 'react';
const {
    StackNavigation,
    TabNavigation,
    TabNavigationItem: TabItem,
} = require('@expo/ex-navigation');
import styles from '../styles';
import Router from './router';

const defaultRouteConfig = {
    navigationBar: {
        backgroundColor: '#fff',
    },
};

export default function TabScreen() {
    return (
        <TabNavigation
            id="main"
            navigatorUID="main"
            initialTab="schedule"
        >
            <TabItem
                id="schedule"
                title="Schedule"
                selectedStyle={styles.tabs.selected}
            >
                <StackNavigation
                    id="schedule"
                    navigatorUID="schedule"
                    initialRoute={Router.getRoute('schedule')}
                />
            </TabItem>
            <TabItem
                id="exercises"
                title="Exercises"
                selectedStyle={styles.tabs.selected}
            >
                <StackNavigation
                    id="exercises"
                    navigatorUID="exercises"
                    initialRoute={Router.getRoute('exercises')}
                />
            </TabItem>
            <TabItem
                id="absences"
                title="Absences"
                selectedStyle={styles.tabs.selected}
            >
                <StackNavigation
                    id="absences"
                    navigatorUID="absences"
                    initialRoute={Router.getRoute('absences')}
                />
            </TabItem>
            <TabItem
                id="canteen"
                title="Canteen"
                selectedStyle={styles.tabs.selected}
            >
                <StackNavigation
                    id="canteen"
                    navigatorUID="canteen"
                    initialRoute={Router.getRoute('canteen')}
                />
            </TabItem>
            <TabItem
                id="more"
                title="More"
                selectedStyle={styles.tabs.selected}
            >
                <StackNavigation
                    id="more"
                    navigatorUID="more"
                    defaultRouteConfig={defaultRouteConfig}
                    initialRoute={Router.getRoute('more')}
                />
            </TabItem>

        </TabNavigation>
    );
}
