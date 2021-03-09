import { BrowserRouter as Router } from "react-router-dom";
import '../style/App.scss';
import Header from './Header.js';
function App() {
  return (
    <>
      <Router>
        <div id="mainContainer" class="container">
          <Header />
          <div id="contentContainer" class="container">
            <p>asdf</p>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
