import { useState } from 'react';
import "../styles/App.scss";
import Header from "./Header.js";
import Projects from "./Projects.js";
import Skills from "./Skills.js";
import Login from "./Login.js";
function App() {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("projects");
  return (
    <div id="mainContainer">
      { token === null ?
        <Login setToken={setToken} /> : 
        <>
        <Header {...{page, setPage}}/>
        <div id="contentContainer">
          {page === "projects" && <Projects />}
          {page === "skills" && <Skills />}
        </div>
        </>
    }
    </div>
  );
}

export default App;
