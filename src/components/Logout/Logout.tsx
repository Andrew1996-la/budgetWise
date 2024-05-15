import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { removeToken } from '../../store/authorizationSlice';
import styles from './logout.module.css';

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');

    const handleClick = () => {
        localStorage.removeItem('token');
        dispatch(removeToken());
        navigate('/greeting');
    };

    return (
        <button className={styles.logout} onClick={handleClick}>
            {token ? 'Signout' : 'SignIn'}
        </button>
    );
};

export default Logout;
