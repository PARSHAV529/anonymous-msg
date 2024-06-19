'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { X } from "lucide-react"
import { Message } from "@/model/User"
import axios from "axios"
import { toast } from "./ui/use-toast"
import { apiResponse } from "@/types/apiresponse"

type messageCradProp ={
message:Message;
onMessageDelete:(messageId:string)=> void
}



export const MessageCard = ({message,onMessageDelete}:messageCradProp) => {
    const handleDeleteConfirm= async ()=>{
       const res=  await axios.delete<apiResponse>(`/api/delete-message/${message._id}`)
       toast({
        title:res.data.message
       })

    //    onMessageDelete(message._id)

    }
    return (
        <>

            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <AlertDialog>
                        <AlertDialogTrigger><X/></AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete this Message
                                    and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardContent>

            </Card></>

    )
}
