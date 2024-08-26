"use client";
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'


const UploadDocument = () => {

    const [document, setDocument] = useState<File | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit  = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        console.log(document);
    }

  return (
    <div className='w-full '>
        <form className='w-full' onSubmit={handleSubmit}>
            <label 
            className='bg-secondary w-full flex 
            h-20 rounded-md border-4 border-dashed 
            border-blue-900 relative' htmlFor="document">
                <div className="absolute inset-0 m-auto flex justify-center
                items-center">{document && document.name ? document.name : 'Drag a file'  }</div>
            </label>
            <input type="file" id='document' 
            className='relative block w-full h-full z-50 opacity-0'
            onChange={(e) => setDocument(e?.target?.files?.[0])}
            />
            <Button type='submit' size="lg" 
            className='mt-2'>Generate Quiz</Button>
        </form>
    </div>
  )
}

export default UploadDocument