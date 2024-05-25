import { FC } from "react";
import FormCreateCategory from "../Form/FormCreateCategory/FormCreateCategory";
import FormCreateOperation from "../Form/FormCreateOperation/FormCreateOperation";
import styles from './buttonGroup.module.css'

interface IButtonGroup {
    openModal: (content: JSX.Element) => void
    closeModal: () => void
}

const ButtonGroup: FC<IButtonGroup> = ({openModal, closeModal}) => {
    return (
        <>
            <button
                className={styles.newOperationBtn}
                onClick={() =>
                    openModal(<FormCreateCategory closeModal={closeModal} />)
                }
            >
                new category
            </button>
            <button
                onClick={() =>
                    openModal(<FormCreateOperation closeModal={closeModal} />)
                }
                className={styles.newOperationBtn}
            >
                new operation
            </button>
        </>
    );
};

export default ButtonGroup;
