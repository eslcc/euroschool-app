import cheerio from 'cheerio-without-node-native';

import { doMsmRequest, METHODS } from './helpers';

const parse = html => {
    const $ = cheerio.load(html);
    const q = selector => $(selector).text();
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

export default (id) =>
    doMsmRequest(
        METHODS.GET,
        '/content/common/calendar_for_students.php'
    )
    .then(item => item.text())
    .then(item => item.match(/<input.*id="user_id".*value="([0-9]+)"/i)[1])
    .then(userId => doMsmRequest(
        METHODS.POST,
        '/data/common_handler.php?action=AssignedExercise::AJAX_U_GetStudentExercise',
        {
            exercise_id: id,
            user_id: userId,
        }
    ))
    .then(response => response.text())
    .then(parse);
