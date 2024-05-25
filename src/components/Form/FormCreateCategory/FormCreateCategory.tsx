import { ChangeEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
    createCategoryThunk,
    editCategoryThunk,
} from '../../../store/categorySlice';
import { AppDispatch } from '../../../store/store';
import Button from '../../Button/Button';
import styles from './formCreateCategory.module.css';

interface IFormCreateCategory {
    closeModal: () => void;
    editText?: string;
    categoryId?: string;
}

const FormCreateCategory: FC<IFormCreateCategory> = ({
    closeModal,
    editText,
    categoryId,
}) => {
    const [categoryName, setCategoryName] = useState(editText ? editText : '');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCategoryName(e.target.value);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const dispatch: AppDispatch = useDispatch();

    const onSubmit = (data: { category: string }) => {
        const id: string | undefined = categoryId;
        const categoryText = data.category;
        if (editText) {
            dispatch(editCategoryThunk({ id, categoryText }));
        } else {
            dispatch(createCategoryThunk(data.category));
        }

        closeModal();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={styles.formHeader}>{editText ? 'Change category' : 'Create category'}</h3>
            <input
                className={styles.input}
                type='text'
                value={categoryName}
                placeholder='write category name'
                {...register('category', {
                    required: true,
                    onChange: (e) => handleChange(e),
                })}
            />
            {errors.category && (
                <span className={styles.warning}>this field is required</span>
            )}
            <Button type='submit'>Save</Button>
        </form>
    );
};

export default FormCreateCategory;
