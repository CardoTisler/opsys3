import ResultsTableHeader from "./ResultsTableHeader";
import {Grid} from '@material-ui/core'
import CellTableRow from './CellTableRow';
import { useSelector } from 'react-redux'
import {firstFit} from '../../algod/firstFit';

const renderResultsTable = (inputArr) => {
    let result = [];
    //algoritmid peavad jagama kogu oma t66 10 etapi vahel.
    //Siia peab tulema array, kus on 10 objekti
    // [
    // { etapiIndex: 1,
         //lisatudProtsess: x
    //  rowData: [{}, {}, {}]
    //
    result = inputArr.map((etapp) => {
        return renderResultsRow(etapp)
    })
    return result;
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

const parseInputString = (inputString) => {
    let tahised = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
    let varvid = ["green", "red", "orange", "blue", "yellow", "purple", "black", "pink", "cyan"]
    let arr = inputString.split(";")
    let etapid = arr.map((input) => {
        return input.split(",");
    });
    let i = -1;
    return etapid.map((etapp) => {
        i += 1;
        return {
            memorySlots: etapp[0],
            duration: etapp[1],
            letter: tahised[i],
            color: varvid[i]
        }
    });
}

const ResultsTable = () => {
    const inputString = useSelector((state) => state.tasksReducer.tasksString);

    const parsedInput = parseInputString(inputString);

    const inputArr = firstFit(parsedInput);

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
