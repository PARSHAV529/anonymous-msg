import dbConnect from '@/lib/dbConnection'
import userModel from '@/model/User'

export async function POST(req: Request){
    await dbConnect()

    try {
        const {username,code}= await req.json()

        const decodedUsername= decodeURIComponent(username)

       const user = await userModel.findOne({username: decodedUsername})

       if(!user){
        return Response.json({
            success: false,
            message: "user not found"
        }, {
            status: 404
        })
       }

        const isCodeValid  = user.verifyCode === code
       const isCodeNotExpired  = new Date(user.verifyCodeExpiry) > new Date()

       if(isCodeValid && isCodeNotExpired){
        user.isVerified= true
        await user.save()
        return Response.json({
            success: true,
            message: "User verified Successfully"
        }, {
            status: 200
        })
       }
       else if(!isCodeValid){
        return Response.json({
            success: false,
            message: "verify Code is inccorrect"
        }, {
            status: 400
        })
       }else if(!isCodeNotExpired){
        return Response.json({
            success: false,
            message: "verified code has expired Plese signUp again to get a new code"
        }, {
            status: 400
        })
       }

    } catch (error) {
        return Response.json({
            success: false,
            message: "Error while verify code"+ error
        }, {
            status: 500
        })
    }
}