import {makeStyles} from '@material-ui/core';
import SingleChoice from "./SingleChoice";


const useStyles = makeStyles({
    root: {
        "display": "block"
    }
})

const ChoicesBox = () => {

    const classes = useStyles();

    return (
        <div>
            <p>Vali või sisesta blabla</p>

            <div>

            </div>
        </div>
    )
}

export default ChoicesBox;
