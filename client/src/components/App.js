import { BrowserRouter as Router, Route } from "react-router-dom";
import "../style/App.scss";
import Header from "./Header.js";
import Skills from "./Skills.js";
function App() {
  return (
    <>
      <Router>
        <div id="mainContainer">
          <Header />
          <div id="contentContainer">
            <Route exact path="/">
              <Skills />
            </Route>
            <Route path="/about">
              <p>about</p>
            </Route>
            <Route path="/contact">
              <p>contact</p>
            </Route>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
