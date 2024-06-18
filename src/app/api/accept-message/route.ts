import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnection";
import userModel from "@/model/User";

export async function POST(req: Request) {

    await dbConnect()

    const session = await getServerSession(authOptions)

    const user = session?.user

    if (!session || !user) {
        return Response.json({
            success: false,
            message: "Not authenticated"

        }, {
            status: 401,
        })
    }

    const userId = user._id
    const { acceptMessage } = await req.json()



    try {
        const updatedUser = await userModel.findByIdAndUpdate(userId,
            {
                isAcceptingMessage: acceptMessage
            },
            {
                new: true
            }
        )

        if (!updatedUser) {
            return Response.json({
                success: false,
                message: "faild to Update user status to accept message"

            }, {
                status: 401,
            })
        }
        return Response.json({
            success: true,
            message: "Message acceptance updated successfully"

        }, {
            status: 200,
        })
    } catch (error) {
        return Response.json({
            success: false,
            message: "faild to Update user status to accept message"

        }, {
            status: 500,
        })
    }
}

export async function GET(req: Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)

    const user = session?.user

    if (!session || !user) {
        return Response.json({
            success: false,
            message: "Not authenticated"

        }, {
            status: 401,
        })
    }

    const userId = user._id

    try {

        const foundedUser = await userModel.findById(userId)

        if (!foundedUser) {
            return Response.json({
                success: false,
                message: "faild to find user"

            }, {
                status: 401,
            })
        }

        return Response.json({
            success: true,
            isAcceptingMessages: foundedUser.isAcceptingMessage

        }, {
            status: 200,
        })



    } catch (error) {
        return Response.json({
            success: true,
            message: "faild to fetch user status"

        }, {
            status: 500,
        })

    }

}

