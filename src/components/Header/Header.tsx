import { FC } from 'react';
import Logo from '../Logo/Logo';
import Logout from '../Logout/Logout';
import Nav from '../Nav/Nav';
import styles from './header.module.css';

const Header: FC = () => {
    return (
        <header className={styles.header}>
            <Logo />
            <Nav />
            <Logout />
        </header>
    );
};

export default Header;
