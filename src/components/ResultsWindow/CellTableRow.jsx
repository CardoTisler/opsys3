import {makeStyles} from "@material-ui/core";
import Cell from './Cell';

let arr = [];
for (let i = 0; i < 50; i++) {
    arr.push(i);
}
const renderCells = (tasksArray) => {
    return tasksArray.map((task) => {
        const {letter, memorySlots, color} = task;
        let x = [];
        for (let i = 0; i < memorySlots; i++) {
            x.push(<Cell backgroundColor={color} taskLetter={letter}/>)
        }
        return x;
    })
        // return arr.map((nr) => {
        //     return <Cell backgroundColor={"blue"} taskLetter={"A"}/>
        // })
}
const useStyles = makeStyles({
    cell: {
        border: "solid",
        borderWidth: "1px",
        borderColor: "black"

    }

})
//rowData on array mis sisaldab objekte kujul
// {
//     letter: "A",
//     memorySlots: 1,
//     ticksLeft: 8
// }
const CellTableRow = (props) => {
    const classes = useStyles();
    return (
        <table>
            <tr className={classes.cell}>
                {renderCells(props.data)}
            </tr>
        </table>
    )
}

export default CellTableRow;
