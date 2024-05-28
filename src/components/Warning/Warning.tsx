import Button from '../Button/Button';
import styles from './warning.module.css';

const Warning = () => {
    return (
        <div className={styles.warning}>
            <h2 className={styles.warningHeader}>
                to create transactions, you need to register
            </h2>
            <Button>Registration</Button>
        </div>
    );
};

export default Warning;
