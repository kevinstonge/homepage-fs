import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../styles/App.scss';
import Header from "./Header.js";

function App() {
  return (
    <div id="mainContainer">
      <Router>
        <Header />
        <Route path="/test1">
        <p>test1</p>
        </Route>
      </Router>
    </div>
  );
}

export default App;
