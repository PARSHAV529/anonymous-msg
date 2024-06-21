'use client'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'
import message from '@/messages.json'

export default function Home() {
  return (
    <main className='flex-grow flex flex-col items-center
    justify-center px-4 md:px-24 py-12'>
      <section className='text-center mb-8 md:mb-12'>
        <h1 className='text-3xl md:text-5xl font-bold'> Dive into the World of Anonymous
          Conversations</h1>
        <p className="mt-3 md:mt-4 text-base md:text-lg">Explore Anonymous message - where your identity remains a secret.</p>
      </section>
      <Carousel className="w-2/3 mt-20 rounded-sm bg-black  "
      plugins={[Autoplay({delay:2000})]}>
        <CarouselContent className=" ">
          {message.map((message,index)=>(
            <CarouselItem className="" key={index}>
            <div className="p-1 w-full ">
              <Card className=" ">
                <CardHeader className="text-xl">
                            {message.title}
                </CardHeader>
                <CardContent className="flex aspect-square w-full  h-20 items-center justify-center ">
                  <span className="text-3xl font-semibold">{message.content}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious /> */}
        {/* <CarouselNext /> */}
      </Carousel>
    </main>
  );
}
