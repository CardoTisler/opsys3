/**
 * Expects tasks in string format like 1,2;4,3;2,3;5,2 etc.
 * @returns {{type: string, payload: {tasksString: tasksString}}}
 */
export const addTasksString = (tasksString) => {
    return {
        type: "ADD_TASKS_STRING",
        payload: {tasksString}
    }
}

/**
 *
 * @returns {{payload: {}, type: string}}
 */
export const getTasksString = () => {
    return {
        type: "GET_TASKS_STRING",
        payload: {}
    }
}
