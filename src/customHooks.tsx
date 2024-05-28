import { useState } from 'react';
import ModalWindow from './components/ModalWindow/ModalWindow';

const useModal = () => {
    const [isShow, setIsShow] = useState(false);
    const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

    const openModal = (content: JSX.Element) => {
        setIsShow(true);
        setModalContent(content);
    };

    const closeModal = () => {
        setIsShow(false);
    };

    const Modal = isShow && (
        <ModalWindow closeModal={closeModal}>
            {modalContent}
        </ModalWindow>
    );

    return {
        isShow,
        setIsShow,
        modalContent,
        openModal,
        closeModal,
        Modal
    };
};

export default useModal;
