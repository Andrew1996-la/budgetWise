import { unwrapResult } from '@reduxjs/toolkit';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
    editNickNameProfile,
    setNickNameProfile,
} from '../../../store/authorizationSlice';
import { AppDispatch, RootState } from '../../../store/store';
import { setErrorMessage } from '../../../utils';
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

    const err = useSelector(
        (state: RootState) => state.authorizationSlice.errorStatus
    );

    const onSubmit = async () => {
        let resultAction;

        if (isEdit && nickNameState) {
            resultAction = await dispatch(editNickNameProfile(nickNameState));
        } else {
            resultAction = await dispatch(setNickNameProfile(nickNameState));
        }
        const result = unwrapResult(resultAction);

        if (!result.error) {
            closeModal();
        }
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
            {err && (
                <span className={styles.warning}>{setErrorMessage(err)}</span>
            )}
            {errors.nickname && (
                <span className={styles.warning}>this fiels is required</span>
            )}

            <Button>Save</Button>
        </form>
    );
};

export default FormEditProfile;
