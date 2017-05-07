import React, { Component, PropTypes } from 'react';
const { Text, TouchableOpacity } = require('@shoutem/ui');
import { connect, Dispatch } from 'react-redux';
import * as moment from 'moment';

import { actions, selectors } from './state';
import styles from '../../styles';

interface DumbProps {
    start: number;
    end: number;
    load: (start: number, end: number) => void;
}

const DumbHeader = ({ start, end, load }: DumbProps) => {
    // TODO refactor this out
    // TODO only download one week at a time, to avoid ludicrous server load
    const loadWeekBefore = () => load(moment.unix(start).subtract(1, 'w').unix(), end);
    return (
        <TouchableOpacity onPress={loadWeekBefore}>
            <Text style={styles.t}>Showing exercises since {moment.unix(start).calendar()}. Tap to load more.</Text>
        </TouchableOpacity>
    );
};

const DumbFooter = ({ start, end, load }: DumbProps) => {
    // TODO refactor this out
    // TODO only download one week at a time, to avoid ludicrous server load
    const loadWeekAfter = () => load(start, moment.unix(end).add(1, 'w').unix());
    return (
        <TouchableOpacity onPress={loadWeekAfter}>
            <Text style={styles.t}>Showing exercises until {moment.unix(end).calendar()}. Tap to load more.</Text>
        </TouchableOpacity>
    );
};

const mapHeaderFooterStateToProps = (state: any) => ({
    start: selectors.start(state),
    end: selectors.end(state),
});

const mapHeaderFooterDispatchToprops = (dispatch: Dispatch<any>) => ({
    load: (start: number, end: number) => dispatch(actions.loadExercises(start, end) as any),
});

const mapper = connect(mapHeaderFooterStateToProps, mapHeaderFooterDispatchToprops);
export const Header = mapper(DumbHeader);
export const Footer = mapper(DumbFooter);