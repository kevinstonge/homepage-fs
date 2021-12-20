import { BrowserRouter as Router, Route } from "react-router-dom";
import "../style/App.scss";
import Header from "./Header.js";
import Skills from "./Skills.js";
import About from "./About.js";
import Contact from "./Contact.js";
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
              <About />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
