import {makeStyles, Button} from '@material-ui/core';
import SingleChoice from "./SingleChoice";
import {useSelector, useDispatch} from "react-redux";
import {addTasksString} from "../../redux/actions/tasksActions";
import {useRef, useState} from "react";
// TODO: Lisada reduxi mingi currentAlgorithm variable mille muutmise alusel ResultsTable re-renderitakse
const useStyles = makeStyles({
    root: {
        "display": "block"
    },
    inputChoices: {
        display: "flex",
        flexDirection: 'column'
    },
    singleChoice: {
        display: "flex",
        flexDirection: "row"
    }
})

const ChoicesBox = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [inputString, setInputString] = useState("")
    const handleFirstFit = () => {
        console.log("triggered")
        dispatch(addTasksString(inputString))
    }
    return (
        <div>
            <p>Vali või sisesta blabla</p>
            <p>Praegu valitud sisend: {inputString}</p>


            <div className={classes.inputChoices}>
                {/*<input type="radio" id="custom1" name="custom1" value="custom1"></input>*/}
                {/*<label for="custom1">Esimene: 4,5;2,7;9,2;4,6;7,1;6,4;8,8;3,6;1,10;9,2</label>*/}

                {/*<input type="radio" id="custom2" name="custom2" value="custom2"></input>*/}
                {/*<label htmlFor="custom2">Teine: 1,10;6,6;3,9;2,4;1,6;5,2;1,4;5,2;2,1;2,7</label>*/}
                {/*<div className={classes.singleChoice}>*/}
                {/*    <input type="radio" id="custom3" name="custom3" value="custom3"></input>*/}
                {/*    <label htmlFor="custom3">Kolmas: 5,10;6,6;3,9;8,4;3,6;5,12;1,4;15,3;3,4;9,7</label>*/}
                {/*</div>*/}

                {/*<div className={classes.singleChoice}>*/}
                {/*    <input type="radio" id="custom4" name="custom4" value="custom4"></input>*/}
                {/*    <label htmlFor="custom4">Neljas: </label>*/}
                {/*    <input type="text"></input>*/}
                {/*</div>*/}
                <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => {
                        setInputString("4,5;2,7;9,2;4,6;7,1;6,4;8,8;3,6;1,10;9,2")
                    }}>
                    Array 1</Button>

                <Button
                    variant="contained"
                    onClick={() => {
                        setInputString("1,10;6,6;3,9;2,4;1,6;5,2;1,4;5,2;2,1;2,7")
                    }}>
                    Array 2</Button>

                <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => {
                        setInputString("5,10;6,6;3,9;8,4;3,6;5,12;1,4;15,3;3,4;9,7")
                    }}>
                    Array 3</Button>

                {/*<Button onClick={handleFirstFit()}>*/}
                {/*    First Fit*/}
                {/*</Button>*/}
            </div>
            <form>
                <Button onClick={handleFirstFit}>
                    First Fit
                </Button>
            </form>
        </div>
    )
}

export default ChoicesBox;
