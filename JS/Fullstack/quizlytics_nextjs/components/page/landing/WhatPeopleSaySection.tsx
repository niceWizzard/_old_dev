"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef } from "react"


const data = [
  {
    name: "Austin Lee",
    said: "Quizzes aren't just about testing knowledge; they're gateways to deeper insights. This app has made studying a joy.",
    image: "/images/landing/selfie_pic_1.jpg"
  },
  {
    name: "Dis Knee.",  
    said: "Quizlytics analytics have revolutionized how I learn. It's like having a personal learning coach guiding me.",
    image: "/images/landing/selfie_pic_3.jpg"
  },
  {
    name: "Mar Veil.",
    said: "Quizlytics has made learning a fun journey of exploration. The quizzes aren't just questions; they're thought-provoking pathways to understanding complex topics.",
    image: "/images/landing/selfie_pic_4.jpg"
  },
  {
    name: "Rizz B.",
    said: "Quizlytics has made quizzes meaningful. The analytics give me a clear picture of my strengths and areas to focus on, helping me truly grasp concepts.",
    image: "/images/landing/selfie_pic_5.jpg"
  },
]

export default function WhatPeopleSaySection() {
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      
      const h = setInterval(() => {
        if(!scrollRef.current) return
        scrollRef.current!.scrollLeft += 1

        const scroll = scrollRef.current.scrollLeft
        const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        if(scroll >= maxScroll) {
          scrollRef.current.scrollLeft = 0
        }

      }, 1000/60)

      return () => {
        clearInterval(h)
      }
    }, [scrollRef])


    return (
      <section className="py-6">
        <h3 className='text-2xl text-onBg-dark font-bold mx-6 mb-3'>What People Say About Us</h3>
        <div  className='no-scrollbar flex flex-row gap-20 overflow-x-scroll px-12' ref={scrollRef} >
          {
            data.map((d, i) => (
              <PeopleSayCard data={d} key={i} />
            ))
          }
        </div>
      </section>
    )
  }
  


interface PeopleSayCardProps {
  data : typeof data[0]
}

function PeopleSayCard({data: {image, name, said,}} : PeopleSayCardProps) {
    return (
      <div className='bg-onBg-ltr rounded-md p-4 min-w-[300px] flex flex-col gap-4'>
          <Image
          src={image}
          height={96*1.5}
          width={128*1.5}
          alt={`${name} picture`}
          className="self-center rounded-md"
          />
          <p>{said}</p>
          <span className="self-end justify-self-end">- {name}</span>
      </div>
    )
  }