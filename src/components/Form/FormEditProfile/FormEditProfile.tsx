import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
    editNickNameProfile,
    setNickNameProfile,
} from '../../../store/authorizationSlice';
import { AppDispatch } from '../../../store/store';
import Button from '../../Button/Button';
import styles from './formEditProfile.module.css';

interface IFormEditProfile {
    nickName?: string;
    isEdit?: boolean;
    closeModal: () => void;
}

const FormEditProfile: FC<IFormEditProfile> = ({
    nickName,
    isEdit,
    closeModal,
}) => {
    const [nickNameState, setNickNameState] = useState(
        nickName ? nickName : ''
    );
    const dispatch: AppDispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = () => {
        if (isEdit && nickNameState) {
            dispatch(editNickNameProfile(nickNameState));
        } else {
            dispatch(setNickNameProfile(nickNameState));
        }
        closeModal();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={styles.formHeader}>
                {isEdit ? 'Edit nickname' : 'Create nickname'}
            </h3>
            <input
                {...register('nickname', {
                    required: true,
                    onChange: (e) => setNickNameState(e.target.value),
                })}
                value={nickNameState}
                className={styles.input}
                placeholder='write profile nickname'
                type='text'
            />
            {errors.nickname && (
                <span className={styles.warning}>this fiels is required</span>
            )}

            <Button>Save</Button>
        </form>
    );
};

export default FormEditProfile;
