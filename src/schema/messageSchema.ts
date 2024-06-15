import { Content } from 'next/font/google'
import {z} from 'zod'

export const messageSchema = z.object({
    content : z.string().
                min(10,{message:'message must be at least 10 characters'}).
                max(300,{message:'message must be not more than 300 characters'})
})