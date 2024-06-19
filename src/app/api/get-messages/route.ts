import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnection";
import userModel from "@/model/User";
import mongoose from "mongoose";

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

    const userId = new mongoose.Types.ObjectId( user._id)

try {
    const AggregateUser = await userModel.aggregate([
        {$match :{id: userId}},
        {$unwind:'$messages'},
        {$sort:{'messages.createAt':-1}},
        {$group:{_id:'$_id',message:{$push:'messages'}}}

    ])

    if(!AggregateUser || AggregateUser.length==0){

        return Response.json({
            success: false,
            message: "user not found"

        }, {
            status: 404,
        })
    }
    if(AggregateUser[0]. return Response.json({
        success: true,
        messages: AggregateUser[0].messages

    }, {
        status: 200,
    }).length==0){
        return Response.json({
            success: false,
            messages: "message not found"
    
        }, {
            status: 404,
        })
    }

    return Response.json({
        success: true,
        messages: AggregateUser[0].messages

    }, {
        status: 200,
    })
} catch (error) {
    return Response.json({
        success: false,
        messages: "error while fetching user"

    }, {
        status: 500,
    })
}
   




    
}