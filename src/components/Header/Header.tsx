import { FC } from 'react';
import Nav from '../Nav/Nav';
import styles from './header.module.css';

const Header: FC = () => {
    return (
        <header className={styles.header}>
            <Nav />
        </header>
    );
};

export default Header;
