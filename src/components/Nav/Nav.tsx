import { NavLink } from 'react-router-dom';
import classes from './nav.module.css';

const Nav = () => {
    return (
        <ul className={classes.navList}>
            <li>
                <NavLink to={'/'}>Главная</NavLink>
            </li>
            <li>
                <NavLink to={'/profile'}>Профиль</NavLink>
            </li>
        </ul>
    );
};

export default Nav;
