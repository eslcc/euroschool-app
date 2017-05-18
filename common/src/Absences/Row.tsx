import React from 'react';
import { Text } from 'react-native';
const { View } = require('@shoutem/ui');

import styles from '../../styles';

export default function (item: string) {
    return (
        <View>
            <Text style={styles.t}>{item}</Text>
        </View>
    );
}
