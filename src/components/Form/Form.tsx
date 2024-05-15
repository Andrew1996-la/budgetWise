import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setTokenThunk } from '../../store/authorizationSlice';
import { AppDispatch, RootState } from '../../store/store';
import Button from '../Button/Button';
import classes from './form.module.css';

interface IForm {
    isLoginForm: boolean;
}

const Form: FC<IForm> = ({ isLoginForm }) => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const placeholder = isLoginForm ? 'login' : 'register';
    const serverError = useSelector(
        (store: RootState) => store.authorizationSlice.error
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit: SubmitHandler<Record<string, string>> = async (data) => {
        await dispatch(setTokenThunk(data));
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <input
                className={classes.input}
                placeholder={`enter ${placeholder}`}
                type='text'
                {...register('email', { required: true })}
            />
            {errors.email && (
                <span className={classes.warning}>This field is required</span>
            )}
            {serverError && (
                <span className={classes.warning}>{serverError}</span>
            )}
            <input
                className={classes.input}
                placeholder='enter password'
                type='password'
                {...register('password', { required: true })}
            />
            {errors.password && (
                <span className={classes.warning}>This field is required</span>
            )}

            <Button type='submit'>{isLoginForm ? 'Login' : 'Register'}</Button>
        </form>
    );
};

export default Form;
