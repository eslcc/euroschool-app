// @flow
import cheerio from 'cheerio-without-node-native';

import { doMsmRequest, METHODS } from '../utils/requestHelpers';

declare type HtmlString = string;

declare type ExerciseDetail = {
    course: string;
    title: string;
    type: string;
    due: string;
    generalComment: HtmlString;
    grade: string;
    status: string;
    supportingComment: HtmlString
}


const parse = (html: HtmlString): ExerciseDetail => {
    const $ = cheerio.load(html);
    const q = (selector: string): string => $(selector).text();
    return {
        course: q('tr:nth-child(1) > td:nth-child(2)'),
        title: q('tr:nth-child(2) > td:nth-child(2)'),
        type: q('tr:nth-child(3) > td:nth-child(2)'),
        due: q('tr:nth-child(4) > td:nth-child(2)'),
        generalComment: $('tr:nth-child(5) > td:nth-child(2)').html(),
        grade: q('tr:nth-child(7) > td:nth-child(2)'),
        status: q('tr:nth-child(8) > td:nth-child(2)'),
        supportingComment: $('tr:nth-child(9) > td:nth-child(2)').html(),
    };
};

export default (id: number): ExerciseDetail =>
    doMsmRequest(
        METHODS.GET,
        '/content/common/calendar_for_students.php'
    )
    .then((item: Response): HtmlString => item.text())
    .then((item: string): string => item.match(/<input.*id="user_id".*value="([0-9]+)"/i)[1])
    .then((userId: string): Response => doMsmRequest(
        METHODS.POST,
        '/data/common_handler.php?action=AssignedExercise::AJAX_U_GetStudentExercise',
        {
            exercise_id: id,
            user_id: userId,
        }
    ))
    .then((response: Response): HtmlString => response.text())
    .then(parse);
