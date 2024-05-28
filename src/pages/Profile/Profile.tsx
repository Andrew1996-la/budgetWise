import { useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import FormEditProfile from '../../components/Form/FormEditProfile/FormEditProfile';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import useModal from '../../customHooks';
import { RootState } from '../../store/store';

const Profile = () => {
    const nickName = useSelector(
        (state: RootState) => state.authorizationSlice.profile.name
    );
    const { Modal, openModal, closeModal } = useModal();

    const setNickName = () => {
        openModal(<FormEditProfile closeModal={closeModal} />);
    };

    const editProfile = () => {
        openModal(
            <FormEditProfile
                closeModal={closeModal}
                isEdit
                nickName={nickName}
            />
        );
    };

    return (
        <div>
            {Modal}
            <ProfileInfo />
            <Button>change pass</Button>
            {!nickName && (
                <Button callback={setNickName}>set nickName profile</Button>
            )}
            <Button callback={editProfile}>edit profile</Button>
        </div>
    );
};

export default Profile;
