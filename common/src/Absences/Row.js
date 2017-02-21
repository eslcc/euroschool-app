import React from 'react';
import { Text } from 'react-native';
import { View } from '@shoutem/ui';

import styles from '../../styles';

export default function (item) {
    return (
        <View>
            <Text style={styles.t}>{item}</Text>
        </View>
    );
}
