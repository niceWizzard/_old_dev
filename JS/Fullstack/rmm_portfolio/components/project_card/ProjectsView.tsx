"use client"

import ProjectCard from "@/components/project_card/ProjectCard"
import { Project } from "@/types"
import { getProjects } from "@/utils"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"


export const metadata : Metadata = {
  title: "RMM - Projects",
  description: "List of projects I have worked on. This is not limited to only web projects but also some games, android, and other platforms I have done."
}

const ProjectsView = () => {

  const projects = getProjects()


  return (
    <>
      <section
      
      id="projects"
      className="p__container border-y border-brand-secondary mt-4 "
      >
        <div className="flex flex-col gap-5 ">
          <div className="flex flex-row items-center justify-between flex-grow mb-4">
              <Image 
              src="/images/rmm_logo.png"
              width={100}
              height={100}
              alt="RMM Logo"
              />
              <h3
              className="text-2xl font-bold "
              >Richard Manansala</h3>
          </div>
          <h2
          className="text-3xl font-bold"
          >Projects List</h2>
          <p>Here are some list of nice little side projects I worked on:</p>
        </div>
        
      </section>
      <div className="flex flex-row flex-wrap gap-4 p__container max-sm:justify-center overflow-hidden">
        {
          projects.map((project,index) => <ProjectCard key={project.url} index={index} project={project} />)
        }
      </div>
    </>
  )
}



export default ProjectsView