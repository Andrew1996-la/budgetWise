import { useNavigate } from 'react-router';
import smallLogo from '../../assets/mobile-logo.png';
import styles from './logo.module.css';

const Logo = () => {
    const navigate = useNavigate();

    return (
        <img
            onClick={() => navigate('/')}
            className={styles.logo}
            src={smallLogo}
            alt='small logo'
        />
    );
};

export default Logo;
