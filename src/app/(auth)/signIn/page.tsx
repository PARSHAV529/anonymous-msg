'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios, { AxiosError } from 'axios'
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceValue } from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schema/signUp"
import { useQuery } from "@tanstack/react-query"
import { apiResponse } from "@/types/apiresponse"
// import { checkUsernameUniqueness } from "@/utils/my-api"



export const page = () => {
  const [username, setUsername] = useState('')
  const [isCheckingusername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmittind] = useState(false)
  const [usernameMessage, setUsernameMessage] = useState('')
  const debaouncedUsername = useDebounceValue(username, 300)
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
      if (debaouncedUsername) {
        setIsCheckingUsername(true)
        setUsernameMessage('')
        try {
          const res = await axios.get(`/api/chek-username-uniqeness?username=${debaouncedUsername}`)
          setUsernameMessage(res.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<apiResponse>
          setUsernameMessage(axiosError.response?.data.message ?? 'Error checking username')

        }finally{
          setIsCheckingUsername(false)
        }

      }


    }

    checkUsernameUniqueness()
  }, [debaouncedUsername])

  return (
    <div>page</div>
  )
}
