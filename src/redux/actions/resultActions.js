export const addNewResult = (payload) => {
    return {
        type: "ADD_RESULT",
        payload: [...payload]
    }
}
