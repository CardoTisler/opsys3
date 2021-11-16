const initialState = "1,8;35,4;3,6;4,2;1,4;3,3;1,2;5,1;50,1"
const secondState = "1,8;7,4;10,6;25,2;1,4;13,3;6,2;8,1;50,1"
export const tasksReducer = (state = {tasksString: initialState}, action) => {
    switch (action.type){
        default:
            return {...state};

        case "ADD_TASKS_STRING":
            return {tasksString: action.payload.tasksString};

        case "GET_TASKS_STRING":
            return {tasksString: state.tasksString};
    }
}

export default tasksReducer;
