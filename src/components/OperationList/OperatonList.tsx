import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOperationThunk } from '../../store/operationSlice';
import { AppDispatch, RootState } from '../../store/store';
import Operation from '../Operation/Operation';
import style from './operationList.module.css';

const OperationList = () => {
    const dispatch: AppDispatch = useDispatch();
    const operationList = useSelector(
        (state: RootState) => state.operationSlice.operationList
    );

    useEffect(() => {
        dispatch(getOperationThunk());
    }, []);
    return (
        <div>
            {operationList.length > 0 && (
                <h3 className={style.operationHeader}>Last opearation</h3>
            )}
            <div className={style.operationList}>
                {operationList.map((operation) => {
                    return (
                        <Operation
                            key={operation.id}
                            id={operation.id}
                            name={operation.name}
                            desc={operation.desc}
                            operationType={operation.type}
                            amount={operation.amount}
                            categoryId={operation.categoryId}
                            date={operation.date}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default OperationList;
