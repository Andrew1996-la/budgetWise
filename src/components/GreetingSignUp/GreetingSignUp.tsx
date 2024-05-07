import { FC } from 'react';
import classes from './greetingSignUp.module.css';

interface IGreetingSignUp {
    isLoginFrom: boolean;
}

const GreetingSignUp: FC<IGreetingSignUp> = ({ isLoginFrom }) => {
    return (
        <div className={classes.wrapper}>
            {isLoginFrom ? (
                <>
                    Don't have an account?
                    <span className={classes.signUp}>SignUp!</span>{' '}
                </>
            ) : (
                <span className={classes.signUp}>SignIn!</span>
            )}
        </div>
    );
};

export default GreetingSignUp;
