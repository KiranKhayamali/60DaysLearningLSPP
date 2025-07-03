export const createUserQueryValidationSchema = {
    filter : {
        isLength : {
            options : {
                min : 3,
                max : 32,
            },
            errorMessage : "Username must be at least 3 and at most 32 characters",
        },
        notEmpty : {
            errorMessage : "Username cannot be empty",
        },
        isString : {
            errorMessage : "Username must be a string!",
        }, 
    },
    value : {
        isLength : {
            options : {
                min : 3,
                max : 32,
            },
            errorMessage : "Username must be at least 3 and at most 32 characters",
        },
        notEmpty : {
            errorMessage : "Username cannot be empty",
        },
        isString : {
            errorMessage : "Username must be a string!",
        }, 
    },
}