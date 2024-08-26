"use client"
import {IoMdClose} from "react-icons/io"
import {GiHamburgerMenu} from "react-icons/gi"
import Image from "next/image"
import { useState } from "react"
import { Transition } from "@headlessui/react"
import Link from "next/link"


const Navbar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false)
  return (
    <header
    className="border-b border-brand-secondary min-h-10 relative"
    >
        <nav
        className="flex justify-between items-center p__container"
        >
            <Link
            href="/"
            className="brand-logo flex flex-row gap-2" >
                <Image 
                src="/images/rmm_logo.png"
                alt="RMM Logo"
                height={24}
                width={24}
                />
                RMM
            </Link>
            <div className="flex flex-row gap-3">
                <Link href="#projects"className="nav__link-desktop" >Projects</Link>
                <Link href="#contact" className="nav__link-desktop">Contact</Link>
            </div>
            <button type="button"
                className="text-3xl text-brand hidden  max-md:block"
                onClick={() => setIsNavOpen(!isNavOpen)}
            >
                <GiHamburgerMenu/>
            </button>
            
        </nav>
        <Transition
            show={isNavOpen}
            enter="transition-opacity duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"

            className="text-center z-10 absolute top-0 left-0 w-screen h-screen flex flex-row justify-end" 
            >
                    <div className="bg-[rgba(0,0,0,0.68)] w-auto flex-grow"
                        onClick={() => setIsNavOpen(false)}
                        >&#160;</div>
                    <div className="flex flex-col gap-6 w-[70vw] bg-surface py-12 items-center ">
                        <button type="button"
                            onClick={() => setIsNavOpen(false)}
                            className="text-9xl"
                        >
                            <IoMdClose/>
                        </button>
                        <Link
                        onClick={() => setIsNavOpen(false)}
                        href="/" className="nav__link active">Home</Link>
                        <Link
                        onClick={() => setIsNavOpen(false)}
                        href="/projects" className="nav__link">Projects</Link>
                        <Link
                        onClick={() => setIsNavOpen(false)}
                        href="/contact" className="nav__link">Contact</Link>
                    </div>
            </Transition>
    </header>
  )
}

export default Navbar