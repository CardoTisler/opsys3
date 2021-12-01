import {makeStyles, Button, TextField} from '@material-ui/core';
import {useState} from "react";
import {firstFit} from "../../algod/firstFit";


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
    },
    textField: {
        marginLeft: '40%',
        width: '20%'
    }
})

const parseInputString = (inputString) => {
    let varvid = ["green", "red", "orange", "blue", "yellow", "purple", "brown", "pink", "cyan"]
    let arr = inputString.split(";")
    let etapid = arr.map((input) => {
        return input.split(",");
    });
    let i = -1;
    return etapid.map((etapp) => {
        i += 1;
        return {
            memorySlots: etapp[1],
            letter: etapp[0],
            color: varvid[i]
        }
    });
}

const ChoicesBox = (props) => {
    const classes = useStyles();
    const [inputString, setInputString] = useState("")

    const handleInput = (newString) => {
        setInputString(newString)
    }

    const handleSubmit = () => {
        const parsedInput = parseInputString(inputString)
        const {result, calculations} = firstFit(parsedInput)
        props.setResults(result);
        props.setCalculations(calculations);
    }

    const clearTable = () => {
        props.clearTable();
    }
    return (
        <div>
            <p>Vali või sisesta kuni kümne taskiga sisend.</p>
            <p>Praegu valitud sisend: {inputString}</p>


            <div className={classes.inputChoices}>
                <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => {
                        handleInput("A,2;B,3;A,-;C,4;B,+3;D,5;E,15;C,-;F,5")
                    }}>
                    Array 1 [A,2;B,3;A,-;C,4;B,+3;D,5;E,15;C,-;F,5]</Button>

                <Button
                    variant="contained"
                    onClick={() => {
                        handleInput("A,2;B,3;C,3;D,5;B,-;E,4;D,-;E,+3;F,6")
                    }}>
                    Array 2 [A,2;B,3;C,3;D,5;B,-;E,4;D,-;E,+3;F,6]</Button>

                <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => {
                        handleInput("A,2;B,3;C,4;D,5;B,-;E,7;D,-;E,+3;F,10")
                    }}>
                    Array 3 [A,2;B,3;C,4;D,5;B,-;E,7;D,-;E,+3;F,10]</Button>

                <TextField
                    className={classes.textField}
                    label="Custom input"
                    name="customTextfieldInput"
                    value={inputString}
                    onChange={(e) => handleInput(e.target.value)}/>
            </div>

            <Button
                onClick={() => handleSubmit()}
                color="primary">
                Run algorithm
            </Button>

            <Button
            onClick={() => clearTable()}
            color="primary">
                Clear output
            </Button>
        </div>
    )
}

export default ChoicesBox;
