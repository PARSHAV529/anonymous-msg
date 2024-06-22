import { resend } from '@/lib/resend'
import VerificationEmail from '../../emails/verificationemail'
import { apiResponse } from '@/types/apiresponse'
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'andhriyapinkey@gmail.com',
        pass: 'dbal akwf tqnj tssf'
    }
});


export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string): Promise<apiResponse> {

    const text = `Hello ${username},  
                                            
                  Thank you for registering.
                  Please use the following verification code to complete your registration:
                        
                        
                        ${verifyCode} 
                        
                If you did not request this code, please ignorethis email.`



    

    console.log(email)
    console.log(username, verifyCode);


    try {
        // const res = await resend.emails.send({
        //     from: 'onboarding@resend.dev',
        //     to: email,
        //     subject: 'Verification email',
        //     react: VerificationEmail({ username, otp: verifyCode }),
        // });

        const res = await transporter.sendMail({
            from: "andhriyapinkey@gmail.com",
            to: email,
            subject: `Verification Code`,
            text: text
        })
        console.log(res);
        return ({ sucess: true, message: 'verification email send successfully' })

    } catch (error) {
        return ({ sucess: false, message: 'faild to send verification email' })
    }
}

