import {z} from 'zod'

export const userNameValidation = z.string()
                                    .min(2,'username must be at least 2 characters')
                                    .max(20,'username must be no more than 20 characters')
                                    .regex(/^[a-zA-Z0-9\s]*$/,'username must not contain any special characters')



export const signUpSchema = z.object({
    username: userNameValidation,
    email:z.string().email({message:'Invalid emaila address'}),
    password:z.string().min(6,{message:'password must be at least 6 characters'}),
})