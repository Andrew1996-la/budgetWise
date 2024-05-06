import { FC } from 'react';
import classes from './input.module.css';

interface IInput {
    type: string;
    placeholder: string;
}

const Input: FC<IInput> = ({ type, placeholder }) => {
    return (
        <input
            className={classes.input}
            type={type}
            placeholder={placeholder}
        />
    );
};

export default Input;
