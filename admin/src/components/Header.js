import { NavLink } from 'react-router-dom';
import '../styles/Header.scss';
export default function Header() {
    return (<header>
        <h1>-admin-</h1>
        <nav>
            <NavLink to="/test1">test1</NavLink>
            <NavLink to="/test2">test2</NavLink>
        </nav>
    </header>)
}