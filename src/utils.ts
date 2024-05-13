export const setErrorMessage = (error: string) => {
    switch (error) {
        case "ValidationError":
            return 'the email is filled in incorrectly'
        case "AccountAlreadyExistError":
            return "this mail already exist"    
        default:
            return "unknown error"
    }
}