import { FC } from 'react';
import styles from './modalWindow.module.css';

type ModalPropsTypes = {
    children: React.ReactNode;
    closeModal: () => void;
};

const ModalWindow: FC<ModalPropsTypes> = ({ children, closeModal }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.boxGeneral}>
                <span onClick={closeModal} className={styles.closeModal}>&#10006;</span>
                <span className={styles.children}>{children}</span>
            </div>
        </div>
    );
};

export default ModalWindow;
