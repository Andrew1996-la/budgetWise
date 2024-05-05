import { NavLink } from 'react-router-dom';
import classes from './nav.module.css';
import '../../fonts.css'

const Nav = () => {
    return (
        <ul className={classes.navList}>
            <li>
                <NavLink to={'/'}>Main</NavLink>
            </li>
            <li>
                <NavLink to={'/profile'}>Profile</NavLink>
            </li>
        </ul>
    );
};

export default Nav;
