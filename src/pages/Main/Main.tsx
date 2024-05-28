import { FC } from 'react';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import CategoryList from '../../components/CategoryList/CategoryList';
import OperationList from '../../components/OperationList/OperatonList';
import Warning from '../../components/Warning/Warning';
import useModal from '../../customHooks';

const Main: FC = () => {
    const { Modal, openModal, closeModal } = useModal();
    const token = localStorage.getItem('token');

    if (!token) {
        return <Warning />;
    }

    return (
        <>
            {Modal}
            <ButtonGroup openModal={openModal} closeModal={closeModal} />
            <CategoryList openModal={openModal} closeModal={closeModal} />
            <OperationList openModal={openModal} closeModal={closeModal} />
        </>
    );
};

export default Main;
