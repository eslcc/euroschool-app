import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';

export default function SingleExercise({ item }) {
    return (
        <View>
            <Text>{JSON.stringify(item)}</Text>
        </View>
    );
}

SingleExercise.propTypes = {
    item: PropTypes.object.isRequired,
};
