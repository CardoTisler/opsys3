const ResultsBox = (props) => {
    const {filesRatio, cellsRatio} = props.calculations;
    return (
        <div>
            <p>
                Allesjäänud failidest on fragmenteerunud {parseInt(filesRatio*100)}%
            </p>
            <p>
                Fragmenteerunud failidele kuulub {parseInt(cellsRatio*100)}% kasutatud ruumist.
            </p>
        </div>
    )
}

export default ResultsBox;
