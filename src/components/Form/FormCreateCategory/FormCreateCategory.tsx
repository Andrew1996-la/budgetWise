import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createCategoryThunk } from '../../../store/categorySlice';
import { AppDispatch } from '../../../store/store';
import Button from '../../Button/Button';
import styles from './formCreateCategory.module.css';
import { FC } from 'react';

interface IFormCreateCategory {
    closeModal: () => void
}

const FormCreateCategory: FC<IFormCreateCategory> = ({closeModal}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const dispatch: AppDispatch = useDispatch();

    const onSubmit = (data: {category: string}) => {
        dispatch(createCategoryThunk(data.category));
        closeModal()
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <input
                className={styles.input}
                type='text'
                placeholder='write category name'
                {...register('category', { required: true })}
            />
            {errors.category && (
                <span className={styles.warning}>this field is required</span>
            )}
            <Button type='submit'>Save</Button>
        </form>
    );
};

export default FormCreateCategory;
