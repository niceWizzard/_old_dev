"use client"
import {motion, } from 'framer-motion'
import TechCard from "./TechCard"

import { techUseds } from "@/constants"

const TechsUsed = () => {
  return (
    <div
    className="p__container"
    >
      <motion.h2
      initial={{
        opacity: 0,
        translateX: "-100%"
      }}
      whileInView={{
        opacity: 1,
        translateX: 0
      }}
      transition={{
        duration: 0.7,
        delay: 0.2,

      }}
      viewport={{ once: true, }}

        className="text-brand text-4xl font-bold mb-6"
        >
          Tech I Use
      </motion.h2>
      <div 
      className="techs-used-container"
      >
      {
          techUseds.map(({name, image} : any, index) => (
                <TechCard
                  key={name}
                  name={name}
                  image={image}
                  index={index}
              />
          ))
      }
      </div>
    </div>

  )
}

export default TechsUsed