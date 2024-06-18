import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnection";
import userModel from "@/model/User";
import { Message } from "@/model/User";
import mongoose from "mongoose";

export async function POST(req: Request){

    await dbConnect()

    const {username,content}= await req.json();

    try {
       const user = await userModel.findOne({username})
       if(!user){
        return Response.json({
            success: false,
            message: "user not found",

        }, {
            status: 404,
        })
       }
       if(!user.isAcceptingMessage){
        return Response.json({
            success: false,
            message: "user not accepting message"

        }, {
            status: 403,
        })

       }

       const newMessage = {content,createdAt:new Date()}
       user.messages.push(newMessage as Message)
       await user.save()
       return Response.json({
        success: true,
        message: "message send successfully"

    }, {
        status: 200,
    })
    } catch (error) {
        return Response.json({
            success: false,
            message: "faild to fetch user"

        }, {
            status: 500,
        })
    }
}