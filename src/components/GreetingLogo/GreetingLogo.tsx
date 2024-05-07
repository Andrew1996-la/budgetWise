import myImage from '../../assets/vertical-logo.png';
import classes from './greetingLogo.module.css';


const GreetingLogo = () => {
    return (
        <div className={classes.imgContainer}>
            <img src={myImage} alt='logo' />
        </div>
    );
};

export default GreetingLogo
