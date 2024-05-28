import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Button from '../Button/Button';
import FormChangePassword from '../Form/FormChangePassword/FormChangePassword';
import FormEditProfile from '../Form/FormEditProfile/FormEditProfile';
import styles from './profileControllers.module.css';

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

    const changePassword = () => {
        openModal(<FormChangePassword closeModal={closeModal} />);
    };

    return (
        <div className={styles.profileController}>
            <Button callback={changePassword}>change pass</Button>
            {!nickName && (
                <Button callback={setNickName}>set nickName profile</Button>
            )}
            <Button callback={editProfile}>edit profile</Button>
        </div>
    );
};

export default ProfileControllers;
