// 1 - firstFit
// 2 - last fit
// 3 - best fit
// 4 - worst fit
// 5 - random fit

const algorithmReducer = (state = {currentAlgorithm: 1}, action) => {
    switch(action.type){
        default:
            return {...state}
        case "CHANGE_ALGORITHM":
            return {currentAlgorithm: action.payload.currentAlgorithm}
    }
}

export default algorithmReducer;
