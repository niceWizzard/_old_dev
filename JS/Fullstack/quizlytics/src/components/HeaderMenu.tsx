import { AnimatePresence, motion, useCycle } from 'framer-motion'
import React, { useState } from 'react'
import {FiMenu} from 'react-icons/fi'




const HeaderMenu = () => {
    const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <div className='sm:hidden flex flex-col justify-center items-center'>
        <button className='text-xl rounded-full bg-primary p-4 text-onBg-ltr' onClick={() => toggleOpen()}>
            <FiMenu />
        </button>
        <div >
            <AnimatePresence>
            {isOpen && (
                <>
                 <motion.div
                    
                    initial={{opacity: 0,}}
                    animate={{opacity: 0.6}}
                    exit={{opacity: 0}}
                    onClick={() => toggleOpen(0)}
                     className='bg-black absolute top-0 left-0 w-screen h-screen'>
                        
                    </motion.div>
            <motion.aside
                className="absolute top-0 right-0 h-screen bg-blue-500 overflow-hidden"
                initial={{ width: 0 }}
                animate={{
                width: "70vw"
                }}
                exit={{
                width: 0,
                }}
            >
                <motion.div
                className='bg-onBg-ltr h-screen flex flex-col p-6'
                >
                <button className='text-3xl' onClick={() => toggleOpen()}>
                    <FiMenu />
                </button>
                    <h3>Quizlytics</h3>
                </motion.div>
            </motion.aside>
            </>
            )}
        </AnimatePresence>
        </div>
    </div>
  )
}

export default HeaderMenu