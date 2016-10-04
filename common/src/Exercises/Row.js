import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';

export default function Row(item) {
    if (!(item)) { return <Text>wat</Text>; }
    return (
        <View>
            <Text>{item.param_1}</Text>
        </View>
    );
}

Row.propTypes = {
    item: PropTypes.object,
};
