import { FC } from 'react';
import Nav from '../Nav/Nav';
import styles from './header.module.css';
import Logout from '../Logout/Logout';

const Header: FC = () => {
    return (
        <header className={styles.header}>
            <Nav />
            <Logout />
        </header>
    );
};

export default Header;
