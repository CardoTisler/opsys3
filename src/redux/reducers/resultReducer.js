export const resultReducer = (state = [], action) => {
    switch(action.type){
        default:
            return state;
        case "ADD_RESULT":
            return [...action.payload]
    }
}
