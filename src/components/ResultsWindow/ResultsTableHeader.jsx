import { Grid } from '@material-ui/core'
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    cell: {
        padding: '4px'
    }
})
const ResultsTableHeader = () => {
    const classes = useStyles();

    const renderCells = () => {
        const result = []
        for (let i = 0; i < 48; i++) {
            result.push(<td className={classes.cell}>{i+1}</td>)
        }
        return result;
    }


    return (
        <div>
            <Grid container>
                <Grid item xs={1}>
                    <p>Etapp</p>
                </Grid>

                <Grid item xs={11}>
                    {renderCells()}
                </Grid>
            </Grid>
        </div>
    )
}

export default ResultsTableHeader;
