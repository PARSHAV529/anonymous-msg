import userModel from "@/model/User";
import dbConnect from '@/lib/dbConnection'
import bcrypt from 'bcryptjs'
import { sendVerificationEmail } from "@/helper/sendVerificartionCode";

export async function POST(request: Request) {
    dbConnect()
    try {
        const { username, email, password } = await request.json()

        const existingUserVerifiedByUsername = await userModel.findOne({ username, isValid: true })

        if (existingUserVerifiedByUsername) {
            return Response.json({ sucess: false, message: 'username already taken' }, {
                status: 400
            })
        }

        const existingUserByEmail = await userModel.findOne({ email, })

        const otp = Math.round((Math.random()* 1000000)).toString()
        
        
        if (existingUserByEmail) {

            if(existingUserByEmail.isVerified){
                return Response.json({
                    success: false,
                    message:"user is already exists with this email"
                },{
                    status:400
                })
            }
            else{
                const hasedPassword = await bcrypt.hash(password, 10)
               
                existingUserByEmail.password = hasedPassword
                existingUserByEmail.verifyCode = otp
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now()+ 300000)
                await existingUserByEmail.save()
                
    
                
            }


        } else {
            const hasedPassword = await bcrypt.hash(password, 10)
            const expDate = new Date()
            expDate.setMinutes(expDate.getMinutes() + 5)

           const newUser= new userModel({
                username,
                email,
                password: hasedPassword,
                verifyCode: otp,
                verifyCodeExpiry: expDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: [],
            })

            await newUser.save()
        }

        const emailResponse = await sendVerificationEmail(email,username,otp)

        if(!emailResponse.sucess){
            return Response.json({
                success: false,
                message:emailResponse.message
            },{
                status:500
            })
        }

        return Response.json({
            success: true,
            message:"user registration is successfully and please verify your email",
        },{
            status:500
        })

    }
    catch (error) {
        console.error('Error registering user', error)
        return Response.json(
            {
                success: false,
                message: "Error registering user"
            },
            {
                status: 500
            }
        )
    }
}