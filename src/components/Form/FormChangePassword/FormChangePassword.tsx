import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../../store/authorizationSlice';
import { AppDispatch } from '../../../store/store';
import Button from '../../Button/Button';
import styles from './formChangePassword.module.css';

interface IFormChangePassword {
    closeModal: () => void;
}

const FormChangePassword: FC<IFormChangePassword> = ({ closeModal }) => {
    const dispatch: AppDispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = () => {
        dispatch(changePassword({ password, newPassword }));
        closeModal();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={styles.formHeader}>Change password</h3>
            <input
                {...(register('password'),
                {
                    required: true,
                    onChange: (e) => setPassword(e.target.value),
                })}
                className={styles.input}
                type='text'
                placeholder='enter your password'
                value={password}
            />
            {errors.password && <span className={styles.warning}>this field is required</span>}
            <input
                {...(register('newPassword'),
                {
                    required: true,
                    onChange: (e) => setNewPassword(e.target.value),
                })}
                className={styles.input}
                type='text'
                placeholder='enter your new password'
                value={newPassword}
            />
            {errors.newPassword && <span className={styles.warning}>this field is required</span>}
            <Button>Save</Button>
        </form>
    );
};

export default FormChangePassword;
