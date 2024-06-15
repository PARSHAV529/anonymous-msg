import {z} from 'zod'

export const acceptingMessage =z.object({
    acceptingMessage: z.boolean()
})