import "../styles/Header.scss";
import { axiosWithoutAuth } from "../api/axios.js";
export default function Header(props) {
  const { page, setPage } = props;
  return (
    <header>
      <nav>
        <button
          className={page === "projects" ? `nav, active` : `nav, inactive`}
          onClick={() => setPage("projects")}
          disabled={page === "projects"}
        >
          projects
        </button>
        <button
          className={page === "skills" ? `nav, active` : `nav, inactive`}
          onClick={() => setPage("skills")}
          disabled={page === "skills"}
        >
          skills
        </button>
      </nav>
      <nav>
        <button onClick={() => axiosWithoutAuth.post(`/admin/logout`)}>
          log out
        </button>
      </nav>
    </header>
  );
}
