import { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Category } from '../../../store/categorySlice';
import { RootState } from '../../../store/store';
import styles from './selectCategory.module.css';

interface ISelectCategory {
    register: UseFormRegister<any>;
}

const SelectCategory: FC<ISelectCategory> = ({ register }) => {
    const categoryList = useSelector(
        (state: RootState) => state.categorySlice.category
    );

    return (
        <select {...register('categoryId')} className={styles.select}>
            {categoryList.map((category: Category) => {
                return (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                );
            })}
        </select>
    );
};

export default SelectCategory;
