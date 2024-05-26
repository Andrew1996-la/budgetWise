import moment from 'moment';
import { FC } from 'react';
import styles from './operation.module.css';

interface IOperationProps {
    operationType: 'Profit' | 'Cost';
    name: string;
    desc?: string;
    amount: number;
    date: string;
}

const Operation: FC<IOperationProps> = ({
    operationType,
    amount,
    date,
    name,
    desc,
}) => {
    const utcMoment = moment.utc(date);
    const localMoment = utcMoment.local();
    const localTimeStr = localMoment.format('YYYY-MM-DD HH:mm');

    return (
        <div className={styles.operation}>
            <div className={styles.operationWrapper}>
                <div className={styles.operationInfo}>
                    <div className={styles.operationType}>
                        Operation type: {operationType}
                    </div>
                    <div className={styles.operationTime}>
                        Date: {localTimeStr}
                    </div>
                </div>
                <div>Operation name: {name}</div>
                <div>{desc && `Operation description: ${desc}`}</div>
                <div className={styles.operationSum}>Sum: {amount} &#8381;</div>
            </div>
        </div>
    );
};

export default Operation;
