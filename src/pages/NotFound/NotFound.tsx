import { useNavigate } from 'react-router';
import Button from '../../components/Button/Button';
import styles from './notFound.module.css';

const NotFound = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/');
    };

    return (
        <div className={styles.notFound}>
            <div>
                <h1>404</h1>
                <h2>Page not found</h2>
            </div>
            <Button callback={handleNavigate}>go to main</Button>
        </div>
    );
};

export default NotFound;
