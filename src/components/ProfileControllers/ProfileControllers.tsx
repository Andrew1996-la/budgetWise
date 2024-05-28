import { useSelector } from 'react-redux';
import FormEditProfile from '../Form/FormEditProfile/FormEditProfile';
import { RootState } from '../../store/store';
import useModal from '../../customHooks';
import Button from '../Button/Button';

const ProfileControllers = () => {
    const { openModal, closeModal } = useModal();

    const nickName = useSelector(
        (state: RootState) => state.authorizationSlice.profile.name
    );

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
        <>
            <Button>change pass</Button>
            {!nickName && (
                <Button callback={setNickName}>set nickName profile</Button>
            )}
            <Button callback={editProfile}>edit profile</Button>
        </>
    );
};

export default ProfileControllers