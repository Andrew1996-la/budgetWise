import styles from './operation.module.css';

const Operation = () => {
    return (
        <div className={styles.operation}>
            <div className={styles.operationWrapper}>
                <div className={styles.operationInfo}>
                    <div className={styles.operationType}>operation type</div>
                    <div className={styles.operationTime}>time</div>
                </div>
                <div className={styles.operationSum}>operation sum</div>
            </div>
       
            <div className={styles.totalSum}>my sum</div>
        </div>
    );
};

export default Operation;
