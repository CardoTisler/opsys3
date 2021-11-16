import logo from './logo.svg';
import './App.css';
import ResultsTable from "./components/ResultsWindow/ResultsTable";
import ChoicesBox from "./components/ChoicesWindow/ChoicesBox";

function App() {
  return (
    <div className="App">
        <ChoicesBox />
      <ResultsTable />
    </div>
  );
}

export default App;
