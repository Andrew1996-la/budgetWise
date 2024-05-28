import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Button from '../Button/Button';
import FormEditProfile from '../Form/FormEditProfile/FormEditProfile';

interface IProfileController {
    openModal: (content: JSX.Element) => void;
    closeModal: () => void;
}

const ProfileControllers: FC<IProfileController> = ({
    closeModal,
    openModal,
}) => {
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

export default ProfileControllers;
