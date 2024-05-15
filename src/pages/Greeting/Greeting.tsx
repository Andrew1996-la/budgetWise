import { useState } from 'react';
import Form from '../../components/Form/Form';
import GreetingLogo from '../../components/GreetingLogo/GreetingLogo';
import GreetingSignUp from '../../components/GreetingSignUp/GreetingSignUp';
import classes from './greeting.module.css';

const Greeting = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const toggleForm = () => {
        setIsLoginForm(!isLoginForm);
    }

    return (
        <>
            <GreetingLogo />
            <h2 className={classes.header}>
                {isLoginForm ? 'SignIn' : 'SignUp'}
            </h2>
            <Form isLoginForm={isLoginForm} />
            <GreetingSignUp toggleForm={toggleForm} isLoginFrom={isLoginForm} />
        </>
    );
};

export default Greeting;
