import { doMsmRequest, METHODS } from './helpers';

export default (id) => {
    return doMsmRequest(
        METHODS.POST,
        '/data/common_handler.php?action=AssignedExercise::AJAX_U_GetStudentExercise',
        {
            exercise_id: id,
        });
};
