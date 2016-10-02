/* eslint-env node, mocha */
/* eslint-disable import/no-extraneous-dependencies, no-ununsed-expressions */
/* global expect */

import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import { Schedule } from '../../../src/Schedule/component';

import OrientationMock from '../stubs/react-native-orientation';

describe('<Schedule />', () => {
    it('should render either portrait or landscape when requested', () => {
        OrientationMock.dev_setOrientation('PORTRAIT', true);
        const props = {
            refresh: sinon.stub(),
        };
        const rendered = shallow(<Schedule {...props} />, { lifecycleExperimental: true });

        OrientationMock.dev_setOrientation('LANDSCAPE', true);
        expect(rendered.update().find('LandscapeSchedule')).to.have.length(1);
    });

    it('should render a loading message', () => {
        const props = {
            loading: true,
        };
        const rendered = shallow(<Schedule {...props} />);

        expect(rendered.find('Text')).to.have.length(1);
    });

    it('should request a load when not loaded', () => {
        const props = {
            load: sinon.stub(),
            refresh: sinon.stub(),
            loading: true,
        };
        shallow(<Schedule {...props} />, { lifecycleExperimental: true });

        expect(props.load).to.have.been.called;
        expect(props.refresh).to.not.have.been.called;
    });

    it('should request a refresh when loaded', () => {
        const props = {
            load: sinon.stub(),
            refresh: sinon.stub(),
            loading: false,
        };
        shallow(<Schedule {...props} />, { lifecycleExperimental: true });

        expect(props.load).to.not.have.been.called;
        expect(props.refresh).to.have.been.called;
    });

    it('should render Days', () => {
        const props = {
            load: sinon.stub(),
            refresh: sinon.stub(),
            loading: false,
            schedule: [
                {
                    entry_type: 'Course',
                    id: '118420',
                    title: 'S5L2-ENC',
                    sql_date: '2016-09-12 ',
                    start: '2016-09-12T08:45:00Z',
                    end: '2016-09-12T09:30:00Z',
                    param_1: 'SA014N',
                    param_2: 'Period 1          -',
                    allDay: false,
                    teacher_name_list: 'REDACTED',
                    room_id: '3',
                    course_diary_id: '0',
                    period_id: '1',
                    color: '#80f31f',
                    textColor: '#000',
                },
            ],
        };
        const rendered = shallow(<Schedule {...props} />);
        const inner = rendered.children().first().shallow();

        expect(inner.find('Day')).to.have.length(5);
    });
});
