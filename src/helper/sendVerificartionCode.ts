import { resend } from '@/lib/resend'
import VerificationEmail from '../../emails/verificationemail'
import { apiResponse } from '@/types/apiresponse'


export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string): Promise<apiResponse> {

        try {
            await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: email,
                subject: 'Verification email',
                react: VerificationEmail({username, otp:verifyCode}),
              });
            return ({sucess: true, message: 'verification email send successfully'})

        } catch (error) {
            return ({sucess: false, message: 'faild to send verification email'})
        }
}

