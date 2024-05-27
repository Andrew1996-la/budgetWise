import moment from 'moment';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import {
    getOperationThunk,
    removeOperationThunk,
} from '../../store/operationSlice';
import { AppDispatch } from '../../store/store';
import styles from './operation.module.css';

interface IOperationProps {
    operationType: 'Profit' | 'Cost';
    name: string;
    desc?: string;
    amount: number;
    date: string;
    categoryId: string;
    id: string;
}

const Operation: FC<IOperationProps> = ({
    operationType,
    amount,
    date,
    name,
    desc,
    categoryId,
    id,
}) => {
    const dispatch: AppDispatch = useDispatch();
    const utcMoment = moment.utc(date);
    const localMoment = utcMoment.local();
    const localTimeStr = localMoment.format('YYYY-MM-DD HH:mm');

    const removeOperation = (id: string) => {
        dispatch(removeOperationThunk(id));
        dispatch(getOperationThunk());
    };

    return (
        <div className={styles.operation}>
            <div className={styles.operationWrapper}>
                <div className={styles.operationInfo}>
                    <div className={styles.operationType}>
                        Operation type: {operationType}
                    </div>
                    <div className={styles.operationTime}>
                        Date: {localTimeStr}
                        <span
                            onClick={() => removeOperation(id)}
                            className={styles.del}
                        >
                            &#10006;
                        </span>
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
