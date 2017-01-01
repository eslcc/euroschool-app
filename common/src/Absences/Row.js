import React from 'react';

import { View, Text } from 'react-native';

import styles from '../../styles';

export default function (item) {
    return (
        <View style={styles.core.card}>
            <Text>{item}</Text>
        </View>
    );
}
