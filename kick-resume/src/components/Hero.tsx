import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className='grid grid-cols-2 bg-primaryColor py-10'>

        <div className=' flex flex-col justify-center px-12 py-10'>
            <h1 className='text-4xl font-semibold'>AI Resume Checker: Get Your Resume Score Now</h1>
            <p className='text-myWhite mt-7'>Get your resume reviewed in an instant. Scan your resume for issues and see how it compares against other resumes in our database.</p>
            <div className="h-[200px] w-[400px] border border-myWhite mt-7 rounded-xl"></div>
        </div>

        <div className='flex items-center px-12 '>
            <Image src="/hero-section.png" alt='picture' height={1000} width={1000} 
            className='rounded-xl'
            />
        </div>
        <div className='bg-blue-800 col-span-2'>Hammad</div>
      
    </div>
  )
}

export default Hero
