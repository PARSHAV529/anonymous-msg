'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios, { AxiosError } from 'axios'
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schema/signUp"
import { useQuery } from "@tanstack/react-query"
import { apiResponse } from "@/types/apiresponse"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { signInSchema } from "@/schema/signIn"
import { signIn } from "next-auth/react"
// import { checkUsernameUniqueness } from "@/utils/my-api"



const SignIn = () => {
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    }
  })



  const onSubmit = async (data: z.infer<typeof signInSchema>) => {

    setIsSubmitting(true)
    try {
      const res = await signIn('credentials',{
        redirect:false,
        identifier:data.identifier,
        password:data.password
       })
       if(res?.error){
        toast({
          title:"Login Faild",
          description:res.error,
          variant:'destructive'
        })
       }
       if(res?.url){
        router.replace('/dashboard')
       }
       
    } catch (error) {
       
    }finally{
      setIsSubmitting(false)

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
            Welcome back To Anonymous Message
          </h1>
          <p className="mb-4">Sign In to start your anonymous
            adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Email or Username"
                      {...field}

                    />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password"
                      type="password"
                      {...field}

                    />
                  </FormControl>
                  {/* <FormDescription>
              This is your public display name.
            </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>{
              isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait</> : "signIn"
            }</Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href="/signup" className="text-blue-600 hover:">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

    </div>
  )
}

export default SignIn
