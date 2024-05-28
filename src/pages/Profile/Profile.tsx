import ProfileControllers from '../../components/ProfileControllers/ProfileControllers';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import useModal from '../../customHooks';
import styles from './profile.module.css';

const Profile = () => {
    const { Modal, openModal, closeModal } = useModal();

    return (
        <div className={styles.profile}>
            {Modal}
            <ProfileInfo />
            <ProfileControllers openModal={openModal} closeModal={closeModal} />
        </div>
    );
};

export default Profile;
