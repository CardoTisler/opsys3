import {makeStyles, Button} from '@material-ui/core';
import {useSelector, useDispatch} from "react-redux";
import {addTasksString} from "../../redux/actions/tasksActions";
import {useRef, useState} from "react";
import {changeCurrentAlgorithm} from "../../redux/actions/algorithmActions";

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

const ChoicesBox = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [inputString, setInputString] = useState("")

    const handleInput = (newString) => {
        setInputString(newString)
    }

    const handleSubmit = (algorithmIndex) => {
        const parsedInput = parseInputString(inputString)

        switch (algorithmIndex){
            default:
                console.log("unknown algo index")
                break;
            case 1:

        }
        console.log(algorithmIndex)
    }
    return (
        <div>
            <p>Vali või sisesta blabla</p>
            <p>Praegu valitud sisend: {inputString}</p>


            <div className={classes.inputChoices}>
                <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => {
                        handleInput("4,5;2,7;9,2;4,6;7,1;6,4;8,8;3,6;1,10;9,2")
                    }}>
                    Array 1</Button>

                <Button
                    variant="contained"
                    onClick={() => {
                        handleInput("1,10;6,6;3,9;2,4;1,6;5,2;1,4;5,2;2,1;2,7")
                    }}>
                    Array 2</Button>

                <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => {
                        handleInput("5,10;6,6;3,9;8,4;3,6;5,12;1,4;15,3;3,4;9,7")
                    }}>
                    Array 3</Button>

                {/*<Button onClick={handleFirstFit()}>*/}
                {/*    First Fit*/}
                {/*</Button>*/}
            </div>

            <Button
                onClick={() => handleSubmit(1)}
                color="primary">

                First Fit
            </Button>

            <Button onClick={() => handleSubmit(3)}
                    color="primary">
                Best Fit
            </Button>

        </div>
    )
}

export default ChoicesBox;
