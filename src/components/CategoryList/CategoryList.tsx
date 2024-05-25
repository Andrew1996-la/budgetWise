import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Category,
    getCategoryThunk,
    removeCategoryThunk,
} from '../../store/categorySlice';
import { AppDispatch, RootState } from '../../store/store';
import FormCreateCategory from '../Form/FormCreateCategory/FormCreateCategory';
import styles from './categoryList.module.css';

interface ICategoruList {
    openModal: (content: JSX.Element) => void;
    closeModal: () => void;
}

const CategoryList: FC<ICategoruList> = ({ openModal, closeModal }) => {
    const dispatch: AppDispatch = useDispatch();
    const categoryList = useSelector(
        (store: RootState) => store.categorySlice.category
    );

    const removeCategory = (id: string) => {
        dispatch(removeCategoryThunk(id));
        dispatch(getCategoryThunk());
    };

    const editCategoryThunk = (id: string, editText: string) => {
        openModal(
            <FormCreateCategory
                closeModal={closeModal}
                editText={editText}
                categoryId={id}
            />
        );
    };

    useEffect(() => {
        dispatch(getCategoryThunk());
    }, [dispatch]);

    return (
        <div className={styles.categoryBlock}>
            <h3 className={styles.categoryHeader}>
                {categoryList.length > 0
                    ? 'Available categories'
                    : 'There are no available categories'}
            </h3>
            <div className={styles.categoryList}>
                {categoryList.map((category: Category) => (
                    <div
                        onDoubleClick={() =>
                            editCategoryThunk(category.id, category.name)
                        }
                        className={styles.categoryItem}
                        key={category.id}
                    >
                        {category.name}
                        <span
                            onClick={() => removeCategory(category.id)}
                            className={styles.close}
                        >
                            &#10006;
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
