"use client"

import { Project } from "@/types"
import { motion } from "framer-motion"
import Image from "next/image"

interface ProjectCardProps { 
    project: Project
    index: number
  }
  
  const ProjectCard = ({project, index} : ProjectCardProps) => {
  
    return (
      <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true}}
      transition={{ duration: 0.3,  delay : 0.1 * index}}
      className="max-w-sm sm:max-w-[250px] md:max-w-[300px]">
        <a
        href={project.url}
        target="_blank"
         className="flex flex-col h-full w-full gap-2 p-3 border border-brand-secondary rounded relative group"
         
         >
          <h3
          className="text-2xl font-bold text-brand"
          >{project.name}</h3>
          <Image 
          src={project.image}
          width={600}
          height={400}
          alt={`${project.name} image `}
          className="object-fit w-full h-full"
          />
          <div className="flex flex-wrap justify-start align-center gap-3 mt-4">
            {
              project.tags.map(tag => (
                <span
                key={tag}
                className="px-2 py-1 text-sm text-white bg-brand rounded-2xl max-md:text-[0.75rem] max-md:py-0"
                >
                  {tag}
                </span>
              ))
            }
          </div>
          <div 
          className={
            `absolute top-0 left-0 w-full h-full flex p-3 bg-surface 
            flex-col transition-all delay-300
            group-focus-within:opacity-100 group-hover:opacity-100 opacity-0 
            duration-400 ease-in-out scale-90 group-focus-within:scale-100 group-hover:scale-100 `}>
            <p
            className="text-md flex-grow"
            >{project.description}</p>
            <span
            className="justify-self-end bg-brand text-white px-3 py-2 text-center rounded-md"
            >Visit</span>
          </div>
        </a>
      </motion.div>
    )
  }


export default ProjectCard