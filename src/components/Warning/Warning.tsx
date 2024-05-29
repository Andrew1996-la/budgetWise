import { useNavigate } from 'react-router';
import Button from '../Button/Button';
import styles from './warning.module.css';

const Warning = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/greeting');
    };

    return (
        <div className={styles.warning}>
            <h2 className={styles.warningHeader}>
                to create transactions, you need to register
            </h2>
            <Button callback={handleNavigate}>Registration</Button>
        </div>
    );
};

export default Warning;
