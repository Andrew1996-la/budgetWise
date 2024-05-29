import ProfileControllers from '../../components/ProfileControllers/ProfileControllers';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import Warning from '../../components/Warning/Warning';
import useModal from '../../customHooks';
import styles from './profile.module.css';

const Profile = () => {
    const { Modal, openModal, closeModal } = useModal();
    const token = localStorage.getItem('token');

    if(!token) {
        return <Warning>To view your profile, you need to register</Warning>
    }

    return (
        <div className={styles.profile}>
            {Modal}
            <ProfileInfo />
            <ProfileControllers openModal={openModal} closeModal={closeModal} />
        </div>
    );
};

export default Profile;
