import ProfileControllers from '../../components/ProfileControllers/ProfileControllers';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import useModal from '../../customHooks';

const Profile = () => {
    const { Modal, openModal, closeModal } = useModal();

    return (
        <div>
            {Modal}
            <ProfileInfo />
            <ProfileControllers openModal={openModal} closeModal={closeModal} />
        </div>
    );
};

export default Profile;
