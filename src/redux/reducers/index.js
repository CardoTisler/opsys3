import { combineReducers } from "redux";
import tasksReducer from "./tasksReducer";
import algorithmReducer from "./algorithmReducer";

const allReducers = combineReducers({
    tasksReducer,
    algorithmReducer
});

export default allReducers;
