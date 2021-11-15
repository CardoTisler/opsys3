import {makeStyles} from '@material-ui/core';

const Cell = (props) => {

    const {backgroundColor, taskLetter} = props;

    const useStyles = makeStyles({
        cell: {
            backgroundColor,
            width: '20px',
        }
    })
    const classes = useStyles();

    return (
        <td className={classes.cell}>{taskLetter}</td>
    )
}


export default Cell;
