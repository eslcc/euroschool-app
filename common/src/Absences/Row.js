import React from 'react';

import { View, Text } from 'react-native';
import { getTheme } from 'react-native-material-kit';

import styles from '../../styles';

const theme = getTheme(); // TODO

export default function (item) {
    return (
        <View style={[theme.cardStyle, styles.core.card]}>
            <Text style={theme.cardContentStyle}>{item}</Text>
        </View>
    );
}
