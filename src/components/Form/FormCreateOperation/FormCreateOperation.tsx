import { ChangeEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
    createOperationThunk,
    editOperationThunk,
    IOperation,
} from '../../../store/operationSlice';
import { AppDispatch } from '../../../store/store';
import Button from '../../Button/Button';
import SelectCategory from '../../Select/SelectCategory/SelectCategory';
import styles from './formCreateOperation.module.css';

interface IFormCreateOperation {
    closeModal: () => void;
    isEdit?: boolean;
    operationId?: string | undefined;
    operationType?: 'Profit' | 'Cost';
    operationName?: string;
    opearationDescr?: string;
    operactionAmount?: number;
}

const FormCreateOperation: FC<IFormCreateOperation> = ({
    closeModal,
    isEdit,
    operationId,
    operationType,
    operationName,
    opearationDescr,
    operactionAmount,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch: AppDispatch = useDispatch();
    const [operationNameState, setOperationNameState] = useState(
        operationName ? operationName : ''
    );
    const [operationDescrState, setOperationDescrState] = useState(
        opearationDescr ? opearationDescr : ''
    );
    const [operationAmountState, setOperationAmountState] = useState(
        operactionAmount ? operactionAmount : ''
    );
    const [operationTypeState, setOperationTypeState] = useState(
        operationType ? operationType : 'Profit'
    );

    const onSubmit = async (data: IOperation) => {
        data.date = new Date().toISOString();
        if (isEdit) {
            dispatch(editOperationThunk({ operationId, data }));
        } else {
            dispatch(createOperationThunk(data));
        }
        closeModal();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2>{isEdit ? 'Edit operation' : 'Create operation'}</h2>
            <input
                value={operationNameState}
                {...register('name', {
                    required: true,
                    onChange: (e: ChangeEvent<HTMLInputElement>) =>
                        setOperationNameState(e.target.value),
                })}
                className={styles.input}
                placeholder='enter operation name'
                type='text'
            />
            {errors.name && (
                <span className={styles.warning}>This field is required</span>
            )}
            <input
                value={operationDescrState}
                {...register('desc', {
                    required: true,
                    onChange: (e: ChangeEvent<HTMLInputElement>) =>
                        setOperationDescrState(e.target.value),
                })}
                className={styles.input}
                placeholder='enter operation descr'
                type='text'
            />
            <input
                value={operationAmountState}
                {...register('amount', {
                    required: true,
                    onChange: (e: ChangeEvent<HTMLInputElement>) =>
                        setOperationAmountState(Number(e.target.value)),
                })}
                className={styles.input}
                placeholder='enter operation amount'
                type='number'
            />
            {errors.amount && (
                <span className={styles.warning}>This field is required</span>
            )}
            <select
                value={operationTypeState}
                {...register('type')}
                className={styles.input}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setOperationTypeState(e.target.value as 'Profit' | 'Cost')
                }
            >
                <option value='Cost'>Cost</option>
                <option value='Profit'>Profit</option>
            </select>
            <SelectCategory register={register} />
            <Button type='submit'>Save</Button>
        </form>
    );
};

export default FormCreateOperation;
