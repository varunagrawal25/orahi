
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home'

function App() {
  return (
    <div>
     <div>

      <Router>
             <Route exact path="/" component={Login} />
             <Route exact path="/home" component={Home} />

      </Router>

    </div>

    </div>
  );
}

export default App;