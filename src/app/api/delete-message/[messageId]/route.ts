import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnection";
import userModel from "@/model/User";
import { Message } from "@/model/User";
import mongoose from "mongoose";

export async function DELETE(req: Request,{params}:{params:{messageId:string}}){

    await dbConnect()

    const messageId = params.messageId
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

   try {
    const res =  await userModel.updateOne({
        _id:user._id,
    },{
        $pull:{
            messages:{_id:messageId}
        }
    })

    if(res.modifiedCount === 0){
        return Response.json({
            success: false,
            message: "Message Not found"
    
        }, {
            status: 404, 
        })
    }
    return Response.json({
        success: true,
        message: "Message deleted successfully"

    }, {
        status: 200, 
    })
   } catch (error) {
    return Response.json({
        success: false,
        message: "error deleting message"

    }, {
        status: 404, 
    })
    
   }


    
}