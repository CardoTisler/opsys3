import './App.css';
import ResultsTable from "./components/ResultsWindow/ResultsTable";
import ChoicesBox from "./components/ChoicesWindow/ChoicesBox";
import ResultsBox from "./components/ResultsBox";
import {useState} from "react";

function App() {
    const [results, setResults] = useState([]);
    const [calculations, setCalculations] = useState({filesRatio: null, cellsRatio: null})
    console.log(calculations);
    const clearTable = () => {
        setResults([]);
        setCalculations({filesRatio: null, cellsRatio: null})
    }
    return (
        <div className="App">
            <ChoicesBox setResults={setResults} clearTable={clearTable} setCalculations={setCalculations}/>
            {calculations.filesRatio !== null && <ResultsBox calculations={calculations} />}
            <ResultsTable data={results} calculations={calculations}/>
        </div>
    );
}

export default App;
