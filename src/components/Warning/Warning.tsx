import { useNavigate } from 'react-router';
import Button from '../Button/Button';
import styles from './warning.module.css';
import { FC } from 'react';

interface IWarning {
    children: string
}

const Warning: FC<IWarning> = ({children}) => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/greeting');
    };

    return (
        <div className={styles.warning}>
            <h2 className={styles.warningHeader}>
                {children}
            </h2>
            <Button callback={handleNavigate}>Registration</Button>
        </div>
    );
};

export default Warning;
