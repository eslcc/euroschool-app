import { doMsmRequest, METHODS } from '../utils/requestHelpers';

export interface ScheduleEntry {
    entry_type: string;
    id: string;
    title: string;
    sql_date: string;
    start: string;
    end: string;
    param_1: string;
    param_2: string;
    allDay: boolean;
    teacher_name_list: string;
    room_id: string;
    course_diary_id: string;
    period_id: string;
    color: string;
    textColor: string;
}

interface GetScheduleResponse {
    schedule: Array<ScheduleEntry>;
    start: number;
    end: number;
}

/**
 * Get the currently logged in user's schedule
 * @param  {moment} start The start of the period to return. Defaults to this Monday at 00:00:00.
 * @param {moment} end The end of the period to return. Defaults to start + 1 week
 * @return {Promise<array<object>>} The schedule entries.
 */
export default async (start: number, end: number): Promise<GetScheduleResponse> => {
    const response = await doMsmRequest(METHODS.POST, '/data/common_handler.php?action=Contact::AJAX_U_GetSchedule', {
        inc_appointment: true,
        start,
        end,
    });
    const data = (await response.json()) as any;
    return {
        schedule: data,
        start,
        end,
    };
};
