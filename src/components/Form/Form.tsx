import { FC } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import classes from './form.module.css';

interface IForm {
    isLoginForm: boolean;
}

const Form: FC<IForm> = ({ isLoginForm }) => {
    const placeholder = isLoginForm ? 'login' : 'register';
    return (
        <form className={classes.form}>
            <Input type='text' placeholder={`enter ${placeholder}`} />
            <Input type='password' placeholder='enter password' />
            <Button>{isLoginForm ? 'Login' : 'Register'}</Button>
        </form>
    );
};

export default Form;
