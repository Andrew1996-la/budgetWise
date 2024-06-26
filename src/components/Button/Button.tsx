import { FC } from 'react';
import classes from './button.module.css';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: string;
    callback?: () => void;
}

const Button: FC<IButton> = ({ children, callback }) => {
    return (
        <button onClick={callback} className={classes.button}>
            {children}
        </button>
    );
};

export default Button;
