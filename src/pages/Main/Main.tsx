import Operation from '../../components/Operation/Operation';
import styles from './main.module.css';

const Main = () => {
    return (
        <>
            <button className={styles.newOperationBtn}>new operation</button>
            <Operation />
        </>
    );
};

export default Main;
