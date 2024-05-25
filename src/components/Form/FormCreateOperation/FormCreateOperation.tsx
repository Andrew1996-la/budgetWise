import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { BASE_URL } from '../../../store/const';
import Button from '../../Button/Button';
import styles from './formCreateOperation.module.css';

interface IFormCreateOperation {
    closeModal: () => void;
}

const FormCreateOperation: FC<IFormCreateOperation> = ({ closeModal }) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        const token = localStorage.getItem('token');
        // data.date = new Date().toISOString();
        data.date = '2023-09-19T10:37:16.389+00:00';
        data.categoryId = '123';
        const amount = Number(data.amount);
        data.amount = amount;
        try {
            const response = await fetch(`${BASE_URL}/operations`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            return await response.json();
        } catch (error) {
            console.error(error);
        }
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

            <Button type='submit'>Save</Button>
        </form>
    );
};

export default FormCreateOperation;
