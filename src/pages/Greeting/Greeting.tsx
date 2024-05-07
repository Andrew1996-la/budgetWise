import Form from '../../components/Form/Form';
import GreetingLogo from '../../components/GreetingLogo/GreetingLogo';
import GreetingSignUp from '../../components/GreetingSignUp/GreetingSignUp';
import classes from './greeting.module.css';

const Greeting = () => {
    const isLoginFrom = false;

    return (
        <>
            <GreetingLogo />
            <h2 className={classes.header}>
                {isLoginFrom ? 'SignIn' : 'SignUp'}
            </h2>
            <Form isLoginForm={isLoginFrom} />
            <GreetingSignUp isLoginFrom={isLoginFrom} />
        </>
    );
};

export default Greeting;
