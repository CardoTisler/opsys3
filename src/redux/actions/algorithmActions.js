export const changeCurrentAlgorithm = (currentAlgorithm) => {
    return {
        type: "CHANGE_ALGORITHM",
        payload: {
            currentAlgorithm
        }
    }
}
