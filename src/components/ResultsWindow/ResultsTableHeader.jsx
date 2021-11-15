import { Grid } from '@material-ui/core'

let arr = [];
for (let i = 0; i < 50; i++) {
    arr.push(i);
}
const renderCells = () => {
    return arr.map((nr) => {
        return <td>{nr}</td>
    })
}
const ResultsTableHeader = () => {
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
