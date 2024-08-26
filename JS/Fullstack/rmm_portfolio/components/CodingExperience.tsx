"use client"

import {motion} from 'framer-motion'


const CodingExperience = () => {
    const startYear = 2020
    const experience = new Date().getFullYear() - startYear;

  return (
    <div
    className="p__container flex justify-stretch items-center overflow-hidden"
    >
        <motion.div 
        initial={{ opacity: 0, translateX:"-100%" }}
        whileInView={{ opacity: 1, translateX: 0 }}
        viewport={{ once: true, }}
        transition={{ duration: 0.7, delay: 0.5, ease: "easeInOut" }}
        className="flex  items-stretch justify-stretch flex-grow">
            <div className="flex justify-center p-2 flex-shrink-0  bg-brand rounded-l-lg  min-w-[100px] min-h-[100px]">
                <span
                className="text-8xl font-bold flex items-center"
                >{experience}</span>
                <span
                className="flex items-start text-5xl justify-start"
                >
                +
                </span>
            </div>
            <p
             className="text-2xl flex-grow border border-brand rounded-r-md flex items-center p-3 sm:text-4xl md:text-5xl md:text-center "
            
            >Years of coding and designing experience</p>
        </motion.div>
    </div>
  )
}

export default CodingExperience