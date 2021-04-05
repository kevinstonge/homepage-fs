import { NavLink } from 'react-router-dom';
import '../styles/Header.scss';
export default function Header() {
    return (<header>
        <nav>
            <NavLink to="/skills">skills</NavLink>
            <NavLink to="/projects">projects</NavLink>
        </nav>
        <nav>
            <button>log out</button>
        </nav>
    </header>)
}