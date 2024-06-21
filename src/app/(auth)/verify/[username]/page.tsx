"use client"

import * as React from "react"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useParams, useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { verifySchema } from "@/schema/verifySchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import axios, { AxiosError } from "axios"
import { apiResponse } from "@/types/apiresponse"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function InputOTPControlled() {
    const [value, setValue] = React.useState("")
    const router = useRouter()
    const params = useParams()
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const username = params.username
    const { toast } = useToast()

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),

    })

    const onSubmit = async () => {
        // e.preventDefault()
        setIsSubmitting(true)
        try {
            const res = await axios.post('/api/verify-code', {
                username: username,
                code: value
            })

            toast({
                title: 'success',
                description: res.data.message
            })

            setIsSubmitting(false)

            router.replace('/signIn')

        } catch (error) {
            const axiosError = error as AxiosError<apiResponse>

            let errorMessage = axiosError.response?.data.message

            toast({
                title: "signUp faild",
                description: errorMessage,
                variant: "destructive"

            })
        }
    }

    return (
        <div className="flex justify-center items-center
        min-h-screen bg-gray-100">
              <div className="w-full max-w-lg p-8 space-y-8 bg-white
        rounded-lg shadow-md">
                <div className="text-center">
                  <h1 className="text-3xl font-extrabold
        tracking-tight lg:text-4xl mb-6">
                    Verify Your Account 
                  </h1>
                
                </div>
                <div className=" flex flex-col justify-center w-full items-center ">
                <Form {...form}>
            <form onSubmit={onSubmit} className="flex gap-2 items-end">
           
           
          <InputOTP
          
                    maxLength={6}
                    value={value}
                    className="text-black"
                    onChange={(value) => setValue(value)}
                >
                    <InputOTPGroup >
                        <InputOTPSlot  index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
            
                <Button type="submit"  disabled={isSubmitting}>{
              isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait</> : "Submit"
            }</Button>
          </form>
        </Form>
                
                <div className="text-center mt-5     text-black text-sm">
                    {value === "" ? (
                        <>Enter the verification code sent to your email</>
                    ) : (
                        <>You entered: {value}</>
                    )}
                </div>
            </div>
              </div>
        
            </div>
     
            
       
    )
}
