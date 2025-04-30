import Link from 'next/link'
import React from 'react'
import QuestionSectionContent from './QuestionSectionContent'

const QuestionSection = () => {
  return (
    <div className='bg-myDarkBlue py-[100px] sm:px-4 px-2 flex flex-col justify-center items-center gap-8 text-center'>
      
      {/* Heading */}
      <div className=" col-span-2 w-[80%] mx-auto text-myLightBlue">
        <h1 className="lg:text-4xl sm:text-2xl text-xl font-semibold">
          The only career toolbox you&apos;ll ever need.
        </h1>
        <p className="lg:text-xl sm:text-sm text-xs mt-2">
        If you don’t find answers to your questions here, don’t hesitate to ask. Our customer service team is always happy to help.
        </p>
      </div>

      {/* Content */}
      <QuestionSectionContent/>
      <QuestionSectionContent/>
      <QuestionSectionContent/>

      <button className='px-10 py-3 mt-5 rounded-xl text-myWhite border hover:bg-myMidblue'>Show More</button>
    </div>
  )
}

export default QuestionSection
