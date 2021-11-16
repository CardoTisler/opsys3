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
        for (let i = 0; i < 50; i++) {
            result.push(<td className={classes.cell}>{i}</td>)
        }
        return result;
    }


    return (
        <div>
            <Grid container>
                <Grid item xs={1}>
                    <p>Etapp</p>
                </Grid>

                <Grid item xs={1}>
                    <p>Lisatud protsess</p>
                </Grid>

                <Grid item xs={10}>
                    {renderCells()}
                </Grid>
            </Grid>
        </div>
    )
}

export default ResultsTableHeader;
