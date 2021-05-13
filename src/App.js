import './App.css';
import MalForm from './components/malForm'
import Typo from "@material-ui/core/Typography"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MalForm />
        {/* <Typo align='right' style={{marginRight: '5%'}} variant="body">Created by Aman Kumar Gupta<br/>May 2021</Typo> */}
        <Typo variant="h6">Created by Aman Kumar Gupta<br/>May 2021</Typo>
      </header>
    </div>
  );
}

export default App;
