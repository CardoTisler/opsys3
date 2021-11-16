export const changeCurrentAlgorithm = (newAlgorithmIndex) => {
    return {
        type: "CHANGE_ALGORITHM",
        payload: {
            currentAlgorithm: newAlgorithmIndex
        }
    }
}
