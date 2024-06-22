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
import styles from '@/HowItWorks.module.css';

export default function Home() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12">
      <section className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-bold">Dive into the World of Anonymous Conversations</h1>
        <p className="mt-3 md:mt-4 text-base md:text-lg">Explore Anonymous message - where your identity remains a secret.</p>
      </section>

      <section id="how-it-works" className="w-2/3 h-20  ">
        <h2 className="text-2xl font-semibold mb-8 text-center">How It Works</h2>
        <Carousel className="w-full mt-10 h-full  rounded-md bg-black" plugins={[Autoplay({ delay: 2000 })]}>
          <CarouselContent>
            {message.map((msg, index) => (
              <CarouselItem key={index}>
                <div className="p-1 w-full">
                  <Card className="bg-white shadow-md">
                    <CardHeader className="lg:text-xl text-md font-semibold  border-gray-200">
                      {msg.title}
                    </CardHeader>
                    <CardContent className="flex h-20 items-center justify-center">
                      <span className="lg:text-lg  text-sm font-medium text-center">{msg.content}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

    </main>
  );
}
