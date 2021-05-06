import { useState } from 'react';
import "../styles/App.scss";
import Header from "./Header.js";
import Projects from "./Projects.js";
import Skills from "./Skills.js";

function App() {
  const [page, setPage] = useState("projects");
  return (
    <div id="mainContainer">
        <Header {...{page, setPage}}/>
        <div id="contentContainer">
          {page === "projects" && <Projects />}
          {page === "skills" && <Skills />}
        </div>
    </div>
  );
}

export default App;
