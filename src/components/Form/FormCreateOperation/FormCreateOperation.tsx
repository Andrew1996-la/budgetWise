import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
    createOperationThunk,
    IOperation,
} from '../../../store/operationSlice';
import { AppDispatch } from '../../../store/store';
import Button from '../../Button/Button';
import SelectCategory from '../../Select/SelectCategory/SelectCategory';
import styles from './formCreateOperation.module.css';

interface IFormCreateOperation {
    closeModal: () => void;
}

const FormCreateOperation: FC<IFormCreateOperation> = ({ closeModal }) => {
    const { register, handleSubmit } = useForm();
    const dispatch: AppDispatch = useDispatch();

    const onSubmit = async (data: IOperation) => {
        data.date = new Date().toISOString();
        dispatch(createOperationThunk(data));
        closeModal();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2>Create operation</h2>
            <input
                {...register('name', { required: true })}
                className={styles.input}
                placeholder='enter operation name'
                type='text'
            />
            <input
                {...register('desc', { required: true })}
                className={styles.input}
                placeholder='enter operation descr'
                type='text'
            />
            <input
                {...register('amount', { required: true })}
                className={styles.input}
                placeholder='enter operation amount'
                type='number'
            />
            <select
                {...register('type')}
                className={styles.input}
                name='OperationType'
                id='operationType'
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
