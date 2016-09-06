// @flow
import moment from 'moment';
import { doMsmRequest, METHODS } from './helpers';

/**
* Get the currently logged in user's schedule
* @param  {moment} start The start of the period to return. Defaults to this Monday at 00:00:00.
* @param {moment} end The end of the period to return. Defaults to start + 1 week
* @return {Promise<array<object>>} The schedule entries.
*/
export default (start = (moment().isoWeekday(0).set({ hour: 0, minute: 0, second: 0 })),
                end = (start.add(1, 'w').subtract(1, 'd'))) =>
    doMsmRequest(METHODS.POST, '/data/common_handler.php?action=Contact::AJAX_U_GetSchedule', {
        inc_appointment: true,
        start: start.unix(),
        end: end.unix(),
    })
    .then((response) => response.json());
