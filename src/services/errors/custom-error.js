class CustomError {
    static createError({name = "Error", cause = "Unkown", message = "Error",code = 1}){
        const error = new Error();
        error.name = name;
        error.cause = cause;
        error.message = message;
        error.code = code;
        throw error;
    }
}

export default CustomError;