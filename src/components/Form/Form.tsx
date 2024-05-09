import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../Button/Button';
import classes from './form.module.css';

interface IForm {
    isLoginForm: boolean;
}

const Form: FC<IForm> = ({ isLoginForm }) => {
    const placeholder = isLoginForm ? 'login' : 'register';

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit: SubmitHandler<Record<string, string>> = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <input
                className={classes.input}
                placeholder={`enter ${placeholder}`}
                type='text'
                {...register(placeholder, { required: true })}
            />
            {errors.placeholder && (
                <span className={classes.warning}>This field is required</span>
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
