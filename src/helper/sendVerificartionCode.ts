import { resend } from '@/lib/resend'
import VerificationEmail from '../../emails/verificationemail'
import { apiResponse } from '@/types/apiresponse'


export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string): Promise<apiResponse> {

        console.log(email)
        console.log(username, verifyCode);
        ;
        
        try {
            const res = await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: email,
                subject: 'Verification email',
                react: VerificationEmail({username, otp:verifyCode}),
              });
              console.log(res);
            return ({sucess: true, message: 'verification email send successfully'})

        } catch (error) {
            return ({sucess: false, message: 'faild to send verification email'})
        }
}

