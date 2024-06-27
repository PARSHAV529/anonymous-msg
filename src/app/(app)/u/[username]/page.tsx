'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { messageSchema } from '@/schema/messageSchema'
import { apiResponse } from '@/types/apiresponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'


 const PublicPage = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)

  const params = useParams()
  


  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {

    setIsSubmitting(true)
    try {
      const res = await axios.post<apiResponse>(`/api/send-messages`, {
        username:params.username,
        content:data.content
      })
      toast({
        title: "success",
        description: res.data.message
      })

      
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

  }
  return (
    <main className='flex-grow flex flex-col items-center
    justify-center px-4 md:px-24 py-12'>
      <section className='text-center mb-8 md:mb-12'>
        <h1 className='text-3xl md:text-5xl font-bold'> Public Profile Link</h1>
      </section>
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-2/3 flex flex-col items-center">

            <FormField
            
              control={form.control}
              name="content"
              
              render={({ field }) => (
                <FormItem className='w-full' >
                  <FormLabel>Send Anonymous Message to @{params.username}</FormLabel>
                  <FormControl>
                    
                    <Textarea placeholder="Type your message here." 
                     {...field}/>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
           
            <Button className='w-30' type="submit" disabled={isSubmitting}>{
              isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait</> : "Send It"
            }</Button>
          </form>
        </Form>
    </main>
  )
}

export default PublicPage
