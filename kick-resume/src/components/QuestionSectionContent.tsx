import Link from 'next/link'
import React from 'react'

const QuestionSectionContent = () => {
  return (
    <div className='w-[80%] mt-5 border border-myLightBlue rounded-xl py-5 sm:px-8 px-4 text-left flex flex-col gap-4 text-myLightBlue'>
        <h1 className='font-bold sm:text-lg text-sm'>What is a resume checker?</h1>
        <p className='sm:text-sm text-xs'>In the most basic terms, a resume checker is an online tool using Artificial Intelligence that can help you answer questions like: “Is my resume good?” and “How can I make my resume better?”</p>

        <h2>The <Link href="/" className='hover:underline underline-offset-2 text-myWhite'>Kickresume AI resume checker</Link> can:</h2>

        <ul className='list-disc pl-5 sm:text-sm text-xs'>
            <li>Get Your resume</li>
            <li>Scan your resume for issues</li>
            <li>Compare your resume against successful resumes in our database</li>
            <li>Grade your resume based on a selection of different criteria</li>
            <li>Give you personalized tips on how to fix any issues that it encounters</li>
            <li>Improve your resume’s quality with a single click</li>
            </ul>

            <h2>Is your resume good? Try the AI resume checker <Link href="/" className='hover:underline underline-offset-2 text-myWhite'>now!</Link></h2>
      </div>
  )
}

export default QuestionSectionContent
