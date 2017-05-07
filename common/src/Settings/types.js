import React  from 'react';
import { Text } from 'react-native';
const { TextInput, Button, Caption, Title } = require('@shoutem/ui');
import * as actions from './actions';
import styles from '../../styles';
import { get } from 'lodash';

export const text = (key, label, defaultValue, keyboardType = 'default', secure = false) => (state, dispatch) => {
    const value = get(state, key) || defaultValue;
    return <TextInput
        key={key}
        placeholder={label}
        secureTextEntry={secure}
        value={value}
        keyboardType={keyboardType}
        styleName="dark"
        onChangeText={text => dispatch(actions.settingChanged(key, text))}
    />;
};

export const button = (label, press) => () => (
    <Button key={`btn-${label}`} styleName={`${styles.dark && 'dark'}`} onPress={press}><Caption>{label}</Caption></Button>
);

export const dispatchButton = (label, factory) => (state, dispatch) => (
    <Button key={`dspBtn-${label}`} styleName={`${styles.dark && 'dark'}`} onPress={() => dispatch(factory(state))}><Caption>{label}</Caption></Button>
);

export const label = (label) => () => (
    <Text key={`lbl-${label}`} style={styles.t}>{label}</Text>
);

export const header = (label) => () => (
    <Title key={`hdr-${label}`} styleName={`${styles.dark && 'bright'}`}>{label}</Title>
);
