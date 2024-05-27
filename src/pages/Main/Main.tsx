import { FC, useState } from 'react';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import CategoryList from '../../components/CategoryList/CategoryList';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import OperationList from '../../components/OperationList/OperatonList';

const Main: FC = () => {
    const [isShow, setIsShow] = useState(false);
    const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

    const openModal = (content: JSX.Element) => {
        setIsShow(true);
        setModalContent(content);
    };

    const closeModal = () => {
        setIsShow(false);
    };

    return (
        <>
            {isShow && (
                <ModalWindow closeModal={() => setIsShow(false)}>
                    {modalContent}
                </ModalWindow>
            )}
            <ButtonGroup openModal={openModal} closeModal={closeModal} />
            <CategoryList openModal={openModal} closeModal={closeModal} />
            <OperationList openModal={openModal} closeModal={closeModal}/>
        </>
    );
};

export default Main;
