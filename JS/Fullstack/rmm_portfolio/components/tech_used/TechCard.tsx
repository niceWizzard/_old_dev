"use client"

import Image from "next/image"
import { motion } from "framer-motion"
interface TechCardProps {
    name: string
    image: string
    index: number
}

const TechCard = ({
    image,
    name,
    index
}: TechCardProps) => {
  return (
    <motion.div
    initial={{
        opacity: 0,
        scale: 0,
    }}
    whileInView={{
        opacity: 1,
        scale: 1,
    }}
    viewport={{ once: true}}
    transition={{
        duration: 0.7,
        delay: (index * 0.05),
    }}
    className=" w-full flex flex-row gap-4 px-4 py-6 justify-around items-center border border-brand-secondary rounded-sm">
        <Image
        src={ image || "/images/rmm_logo.png"}
        width={36}
        height={36}
        alt="Tech Logo"
        className="object-contain"
        />
        <p
        className="text-xl"
        >{name}</p>
    </motion.div>
  )
}

export default TechCard