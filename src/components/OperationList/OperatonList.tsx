import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOperationThunk, IOperation } from '../../store/operationSlice';
import { AppDispatch, RootState } from '../../store/store';
import Loading from '../Loading/Loading';
import Operation from '../Operation/Operation';
import style from './operationList.module.css';

interface IOperationList {
    openModal: (content: JSX.Element) => void;
    closeModal: () => void;
}

const OperationList: FC<IOperationList> = ({ openModal, closeModal }) => {
    const dispatch: AppDispatch = useDispatch();
    const operationList = useSelector(
        (state: RootState) => state.operationSlice.operationList
    );

    const loading = useSelector(
        (state: RootState) => state.operationSlice.loading
    );

    useEffect(() => {
        dispatch(getOperationThunk());
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            {operationList.length > 0 && (
                <h3 className={style.operationHeader}>Last opearation</h3>
            )}
            <div className={style.operationList}>
                {operationList.map((operation: IOperation) => {
                    return (
                        <Operation
                            key={operation.id}
                            openModal={openModal}
                            closeModal={closeModal}
                            id={operation.id}
                            category={operation.category.name}
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
