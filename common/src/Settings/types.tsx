import React  from 'react';
import { Text } from 'react-native';
const { TextInput, Button, Caption, Title } = require('@shoutem/ui');
import { actions } from './state';
import styles from '../../styles';
import { get } from 'lodash';

type dispatch = (action: any) => void;

export const text = (
    key: string,
    label: string,
    defaultValue: string,
    keyboardType = 'default',
    secure = false
    ) => (state: any, dispatch: dispatch) => {
        const value = get(state, key) || defaultValue;
        // tslint:disable jsx-no-lambda
        return (
            <TextInput
                key={key}
                placeholder={label}
                secureTextEntry={secure}
                value={value}
                keyboardType={keyboardType}
                styleName="dark"
                onChangeText={(text: string) => dispatch(actions.settingChanged(key, text))}
            />
        );
    };

export const button = (label: string, press: () => void) => () => (
    <Button
        key={`btn-${label}`}
        styleName={`${styles.dark && 'dark'}`}
        onPress={press}
    >
        <Caption>{label}</Caption>
    </Button>
);

export const dispatchButton =
    (label: string, factory: (state: any) => any) =>
    (state: any, dispatch: dispatch) => (
    <Button
        key={`dspBtn-${label}`}
        styleName={`${styles.dark && 'dark'}`}
        onPress={() => dispatch(factory(state))}
    >
        <Caption>{label}</Caption>
    </Button>
);

export const label = (label: string) => () => (
    <Text key={`lbl-${label}`} style={styles.t}>{label}</Text>
);

export const header = (label: string) => () => (
    <Title key={`hdr-${label}`} styleName={`${styles.dark && 'bright'}`}>{label}</Title>
);
