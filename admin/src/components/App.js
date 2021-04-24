import { BrowserRouter as Router, Route } from "react-router-dom";
import "../styles/App.scss";
import Header from "./Header.js";
import Projects from "./Projects.js";
import Skills from "./Skills.js";

function App() {
  return (
    <div id="mainContainer">
      <Router>
        <Header />
        <div id="contentContainer">
          <Route path="/skills">
            <Skills />
          </Route>
          <Route path="/projects">
            <Projects />
          </Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
