import { combineReducers } from "redux";
import tasksReducer from "./tasksReducer";

const allReducers = combineReducers({
    tasksReducer
});

export default allReducers;
