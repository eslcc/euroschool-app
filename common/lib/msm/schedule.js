// @flow

import { doMsmRequest, METHODS } from './helpers';
import moment from 'moment';

/**
 * Get the currently logged in user's schedule
 * @param  {moment} start The start of the period to return. Defaults to this Monday at 00:00:00.
 * @param {moment} end The end of the period to return. Defaults to start + 1 week
 * @return {Promise<array<object>>} The schedule entries.
 */
export default function getSchedule(start = (moment().isoWeekday(0).hour(0).minute(0).second(0)), end = (start.add(1, 'w').subtract(1, 'd'))) {
  return doMsmRequest(METHODS.POST, '/data/common_handler.php?action=Contact::AJAX_U_GetSchedule', {
    inc_appointment: true,
    start: start.unix(),
    end: end.unix(),
  })
  .then((response) => response.json());
}
