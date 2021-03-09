import { BrowserRouter as Router } from "react-router-dom";
import '../style/App.scss';
import Header from './Header.js';
function App() {
  return (
    <>
      <Router>
        <div id="mainContainer">
          <Header />
        </div>
      </Router>
    </>
  );
}

export default App;
