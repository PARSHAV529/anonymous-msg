'use client'
import { useToast } from '@/components/ui/use-toast'
import { Message } from '@/model/User'
import { acceptingMessage } from '@/schema/acceptingMessage'
import { apiResponse } from '@/types/apiresponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { User } from 'next-auth'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Loader2, RefreshCcw } from 'lucide-react'
import { MessageCard } from '@/components/MessageCard'
import { log } from 'console'

const Dashboard = () => {
  const [message, setMessage] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [switchLoading, setSwitchLoading] = useState(false)
  const route = useRouter()

  const { toast } = useToast()

 

  const handelDeleteMessage = (messageId: string) => {

    setMessage(message.filter((message) => message._id !== messageId))


  }
  const { data: session } = useSession()

  

   if (!session || !session.user) {
    // return <div>plese Login </div>
    route.replace('/signIn')
  }

  const form = useForm({
    resolver: zodResolver(acceptingMessage)
  })
  const { register, watch, setValue } = form
  const acceptMessage = watch('acceptMessage')
  
  const fetchacceptMessage = useCallback(async () => {
    setSwitchLoading(true)

    try {
      const res = await axios.get<apiResponse>('/api/accept-message')
      setValue('acceptMessage', res.data.isAcceptingMessage)
      
      


    } catch (error) {
      const axiosError = error as AxiosError<apiResponse>
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "Failed to fetch accept message",
        variant: 'destructive'
      })
    } finally {
      setSwitchLoading(false)
    }
  }, [setValue,setSwitchLoading])

  const fetchMessage = useCallback(async (refresh: boolean = false) => {

    setLoading(true)
    setSwitchLoading(false)
    try {
      const res = await axios.get<apiResponse>('/api/get-messages')
      setMessage(res.data.messages || [])
      console.log(res.data);
      

      if (refresh) {
        toast({
          title: "Refreshed Messages",
          description: "Showing latest messages ",
          variant: 'default'
        })
      }
    } catch (error) {
      const axiosError = error as AxiosError<apiResponse>
      console.log(axiosError);

      toast({
        title: "Error",
        description: axiosError.response?.data.message || "Failed to fetch message",
        variant: 'destructive'
      })
    }
    finally {
      setLoading(false)
      setSwitchLoading(false)
    }


  }, [setLoading, setMessage])

  useEffect(() => {

    if (!session || !session.user) return

    fetchMessage()
    fetchacceptMessage()

  }, [fetchMessage, setValue, session, fetchacceptMessage])

  const handleSwitchChange = async () => {
    try {
      const res = await axios.post('/api/accept-message', {
        acceptMessage: !acceptMessage
      })
      setValue('acceptMessage', !acceptMessage)
      toast({
        title: res.data.message,
        variant: 'default'
      })
    } catch (error) {
      const axiosError = error as AxiosError<apiResponse>
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "Failed to fetch accept message",
        variant: 'destructive'
      })
    }
  }

  const user = session?.user as User
  let username;
  if(user)
  username = user.username 
  
  
  
// if (typeof window !== "undefined") {
//   // Client-side-only code
// }
  const profilURL = `${typeof window !== "undefined" && window.location.protocol}//${typeof window !== "undefined" && window.location.host}/u/${username}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profilURL)
    toast({
      title: "URL copied"
    })
  }


  
  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy Your
          Unique Link</h2>{' '}
        <div className="flex items-center">
          <input
            type="text"
            value={profilURL}
            disabled
            className="input input-bordered w-full p-2 mr-2" />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>

      </div>

      <div className="mb-4">
        <Switch
          {...register('acceptMessage')}
          checked={acceptMessage}
          onCheckedChange={handleSwitchChange}
          disabled={switchLoading}
        />
        
        <span className="ml-2">
          
          Accept Messages: {acceptMessage ? 'On' : 'Off'}
        </span>
      </div>
      <Separator />

      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessage(true);
        }}>
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {message.length > 0 ? (
          message.map((message, index) => (  
            <MessageCard
              key={index}
              message={message}
              onMessageDelete={handelDeleteMessage}
            />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div >

  )
}

export default Dashboard
