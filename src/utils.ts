export const setErrorMessage = (error: string) => {
    switch (error) {
        case 'ValidationError':
            return 'the email is filled in incorrectly';
        case 'AccountAlreadyExistError':
            return 'this mail already exist';
        case 'IncorrectEmailOrPasswordError':
            return 'incorrect email or password';
        case 'ERR_VALIDATION_ERROR':
            return 'not correct nickname'
        default:
            return 'unknown error';
    }
};