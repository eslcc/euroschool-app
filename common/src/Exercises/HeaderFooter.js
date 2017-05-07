import React, { Component, PropTypes } from 'react';
const { Text, TouchableOpacity } = require('@shoutem/ui');
import { connect } from 'react-redux';

import { actions, selectors } from './state';

const DumbHeader = ({ start, end, load }) => {
    // TODO refactor this out
    // TODO only download one week at a time, to avoid ludicrous server load
    const loadWeekBefore = () => load(moment.unix(start).subtract(1, 'w').unix(), end);
    return (
        <TouchableOpacity onPress={loadWeekBefore}>
            <Text style={styles.t}>Showing exercises since {moment.unix(start).calendar()}. Tap to load more.</Text>
        </TouchableOpacity>
    );
};

const DumbFooter = ({ start, end, load }) => {
    // TODO refactor this out
    // TODO only download one week at a time, to avoid ludicrous server load
    const loadWeekAfter = () => load(start, moment.unix(end).add(1, 'w').unix());
    return (
        <TouchableOpacity onPress={loadWeekAfter}>
            <Text style={styles.t}>Showing exercises until {moment.unix(end).calendar()}. Tap to load more.</Text>
        </TouchableOpacity>
    );
};

DumbHeader.propTypes = DumbFooter.propTypes = {
    start: PropTypes.number,
    end: PropTypes.number,
    load: PropTypes.func,
};

const mapHeaderFooterStateToProps = state => ({
    start: selectors.start(state),
    end: selectors.end(state),
});

const mapHeaderFooterDispatchToprops = dispatch => ({
    load: (start, end) => dispatch(actions.loadExercises(start, end)),
});

const mapper = connect(mapHeaderFooterStateToProps, mapHeaderFooterDispatchToprops);
export const Header = mapper(DumbHeader);
export const Footer = mapper(DumbFooter);