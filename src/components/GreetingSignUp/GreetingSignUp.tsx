import { FC } from 'react';
import classes from './greetingSignUp.module.css';

interface IGreetingSignUp {
    isLoginFrom: boolean;
    toggleForm: () => void;
}

const GreetingSignUp: FC<IGreetingSignUp> = ({ isLoginFrom, toggleForm }) => {
    return (
        <div className={classes.wrapper}>
            {isLoginFrom ? (
                <>
                    Don't have an account?
                    <span onClick={toggleForm} className={classes.signUp}>
                        SignUp!
                    </span>
                </>
            ) : (
                <span onClick={toggleForm} className={classes.signUp}>
                    SignIn!
                </span>
            )}
        </div>
    );
};

export default GreetingSignUp;
