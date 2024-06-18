import { z } from 'zod'
import dbConnect from '@/lib/dbConnection'
import userModel from '@/model/User'
import { userNameValidation } from '@/schema/signUp'

const UsernameQuerySchema = z.object({
    username: userNameValidation

})

export async function GET(req: Request) {


    await dbConnect()

    try {
        const { searchParams } = new URL(req.url)
        const queryParams = {
            username: searchParams.get('username'),
        }
        //validate with xode 
        const result = UsernameQuerySchema.safeParse(queryParams)
        console.log(result);
        if (!result.success) {
            const usernameError = result.error.format().username?._errors || []
            return Response.json({
                success: false,

                message: usernameError.length > 0 ? usernameError.join(",") : " invalid username"
            }, {
                status: 400,
            })
        }

        const { username } = result.data;

        const existingUserVerified = await userModel.findOne({ username, isVerified: true })

        if (existingUserVerified) {

            return Response.json({
                success: false,

                message: "username alredy exist"
            }, {
                status: 400,
            })
        }

        return Response.json({
            success: true,

            message: "username is valid"
        }, {
            status: 200,
        })


    } catch (error) {
        console.error(error)
        return Response.json({
            success: false,
            message: "Error while cheking username"
        }, {
            status: 500
        })
    }
}