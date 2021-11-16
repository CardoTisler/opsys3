import {makeStyles, Button, TextField} from '@material-ui/core';
import {useDispatch} from "react-redux";
import {useState} from "react";
import {addNewResult} from "../../redux/actions/resultActions";
import {firstFit} from "../../algod/firstFit";
import {bestFit} from "../../algod/bestFit";
import {lastFit} from "../../algod/lastFit";
import {worstFit} from "../../algod/worstFit";
import {randomFit} from "../../algod/randomFit";

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
    let tahised = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
    let varvid = ["green", "red", "orange", "blue", "yellow", "purple", "brown", "pink", "cyan"]
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

const ChoicesBox = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [inputString, setInputString] = useState("")

    const handleInput = (newString) => {
        setInputString(newString)
    }

    const handleSubmit = (algorithmIndex) => {
        const parsedInput = parseInputString(inputString)

        switch (algorithmIndex) {
            default:
                console.log("unknown algo index")
                break;
            case 1:
                dispatch(addNewResult(firstFit(parsedInput)))
                break;
            case 2:
                dispatch(addNewResult(lastFit(parsedInput)))
                break;
            case 3:
                dispatch(addNewResult(bestFit(parsedInput)))
                break;
            case 4:
                dispatch(addNewResult(worstFit(parsedInput)))
                break;
            case 5:
                dispatch(addNewResult(randomFit(parsedInput)))
                break;
        }
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
                        handleInput("1,8;35,4;3,6;4,2;1,4;3,3;1,2;5,1;50,1")
                    }}>
                    Array 1 [1,8;35,4;3,6;4,2;1,4;3,3;1,2;5,1;50,1]</Button>

                <Button
                    variant="contained"
                    onClick={() => {
                        handleInput("1,10;6,6;3,9;2,4;1,6;5,2;1,4;5,2;2,1;2,7")
                    }}>
                    Array 2 [1,10;6,6;3,9;2,4;1,6;5,2;1,4;5,2;2,1;2,7]</Button>

                <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => {
                        handleInput("5,10;6,6;3,9;8,4;3,6;5,12;1,4;15,3;3,4;9,7")
                    }}>
                    Array 3 [5,10;6,6;3,9;8,4;3,6;5,12;1,4;15,3;3,4;9,7]</Button>

                <TextField
                    className={classes.textField}
                    label="Custom input"
                    name="customTextfieldInput"
                    value={inputString}
                    onChange={(e) => handleInput(e.target.value)}/>
            </div>

            <Button
                onClick={() => handleSubmit(1)}
                color="primary">
                First Fit
            </Button>

            <Button onClick={() => handleSubmit(2)}
                    color="primary">
                Last Fit
            </Button>

            <Button onClick={() => handleSubmit(3)}
                    color="primary">
                Best Fit
            </Button>

            <Button onClick={() => handleSubmit(4)}
                    color="primary">
                Worst Fit
            </Button>

            <Button onClick={() => handleSubmit(5)}
                    color="primary">
                Random Fit
            </Button>
        </div>
    )
}

export default ChoicesBox;
