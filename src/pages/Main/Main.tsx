import { FC, useState } from 'react';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import CategoryList from '../../components/CategoryList/CategoryList';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import Operation from '../../components/Operation/Operation';

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
            <CategoryList openModal={openModal} closeModal={closeModal}/>
            <Operation />
        </>
    );
};

export default Main;
