import logo from './logo.svg';
import './App.css';
import TransactionList from "./components/TransactionList";
import TransactionForm from "./components/TransactionForm";

function App() {
  return (
    <div className="App">
        <TransactionList/>
        <TransactionForm/>
    </div>
  );
}

export default App;
