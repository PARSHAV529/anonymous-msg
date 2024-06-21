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
// import { checkUsernameUniqueness } from "@/utils/my-api"



const Signup = () => {
  const [username, setUsername] = useState('')
  const [isCheckingusername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [usernameMessage, setUsernameMessage] = useState('')
  const debounced = useDebounceCallback(setUsername, 500)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    }
  })

  // const {data,isPending,isError,error} = useQuery({ queryKey: ['checkusername'], queryFn: ()=>checkUsernameUniqueness({username:debaouncedUsername}) })
  useEffect(() => {
    const checkUsernameUniqueness = async () => {
      if (username) {
        setIsCheckingUsername(true)
        setUsernameMessage('')
        try {
          const res = await axios.get(`/api/chek-username-uniqeness?username=${username}`)
          setUsernameMessage(res.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<apiResponse>
          setUsernameMessage(axiosError.response?.data.message ?? 'Error checking username')

        } finally {
          setIsCheckingUsername(false)
        }

      }


    }

    checkUsernameUniqueness()
  }, [username])

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {

    setIsSubmitting(true)
    try {
      const res = await axios.post<apiResponse>(`/api/signUp`, data)
      toast({
        title: "success",
        description: res.data.message
      })

      router.replace(`/verify/${username}`)
      setIsSubmitting(false)
    } catch (error) {
      console.error(error)
      const axiosError = error as AxiosError<apiResponse>

      let errorMessage = axiosError.response?.data.message

      toast({
        title: "signUp faild",
        description: errorMessage,
        variant: "destructive"

      })
      setIsSubmitting(false)
    }
    setUsername('')

  }
  return (
    <div className="flex justify-center items-center
min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-8 bg-white
rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold
tracking-tight lg:text-4xl mb-6">
            Join Anonymous Message
          </h1>
          <p className="mb-4">Sign up to start your anonymous
            adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value);
                      }}
                    />
                   
                  </FormControl>

                  {
                        isCheckingusername && <Loader2 className="animate-spin"/>
                }
                    {!isCheckingusername && username.length>0 && <p className={`text-sm ${usernameMessage==='username is valid' ? 'text-green-500':'text-red-500'} `}>{usernameMessage}</p>}
           
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email"
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
              isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait</> : "signUp"
            }</Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href="/signIn" className="text-blue-600 hover:">
              Sign in
            </Link>
          </p>
        </div>
      </div>

    </div>
  )
}

export default Signup
