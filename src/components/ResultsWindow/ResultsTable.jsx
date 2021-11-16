import ResultsTableHeader from "./ResultsTableHeader";
import {Grid} from '@material-ui/core'
import CellTableRow from './CellTableRow';
import { useSelector } from 'react-redux'
import {firstFit} from '../../algod/firstFit';
import {bestFit} from '../../algod/bestFit';
import {worstFit} from '../../algod/worstFit'
import {lastFit} from '../../algod/lastFit'
import {randomFit} from '../../algod/randomFit'

const renderResultsTable = (inputArr) => {
    let result = [];
    result = inputArr.map((etapp) => {
        //if memory slots exceeded in a step, etapp.rowData will be null
        if(etapp.rowData){ return renderResultsRow(etapp) }
        return renderAbortAlgorithmRow(etapp);

    })
    return result;
}

const renderAbortAlgorithmRow = (etapp) => {
    const rowData = []
    for (let i = 0; i < 50; i++) {
        let slot = {letter: " ", color: "black", memorySlots: 1}
        if(i === 16){
            slot = {...slot, letter: "P"}
        } else if (i === 17){
            slot = {...slot, letter: "R"}
        } else if (i === 18) {
            slot = {...slot, letter: "O"}
        } else if (i === 19){
            slot = {...slot, letter: "T"}
        } else if (i === 20 || i === 22 || i === 23){
            slot = {...slot, letter: "S"}
        } else if (i === 21 || i === 25){
            slot = {...slot, letter: "E"}
        } else if ( i === 26){
            slot = {...slot, letter: "I"}
        } else if (i === 28 || i === 33) {
            slot = {...slot, letter: "M"}
        } else if (i === 29) {
            slot = {...slot, letter: "A"}
        } else if (i === 30) {
            slot = {...slot, letter: "H"}
        } else if (i === 31 || i === 37) {
            slot = {...slot, letter: "U"}
        } else if (i === 34) {
            slot = {...slot, letter: "Ä"}
        } else if (i === 35 || i === 36) {
            slot = {...slot, letter: "L"}
        }

        rowData.push(slot)
    }
    return renderResultsRow({...etapp, rowData})
}
const renderResultsRow = (data) => {
    return (
        <Grid item xs={12}>
            <Grid container>
                <Grid item xs={1}>
                    <p>{data.etapiIndex}</p>
                </Grid>

                <Grid item xs={1}>
                    <p>{data.lisatudProtsess}</p>
                </Grid>

                <Grid item xs={10}>
                    <CellTableRow data={data.rowData}/>
                </Grid>
            </Grid>
        </Grid>
    );
}

const ResultsTable = () => {
    const inputString = useSelector((state) => state.tasksReducer.tasksString);
    const algorithmChoice = useSelector((state) => state.algorithmReducer.currentAlgorithm)
    const parsedInput = parseInputString(inputString);
    // let inputArr = firstFit(parsedInput);
    let inputArr = randomFit(parsedInput);

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <ResultsTableHeader/>
                </Grid>

                {renderResultsTable(inputArr)}

            </Grid>
        </div>
    )
}

export default ResultsTable;
