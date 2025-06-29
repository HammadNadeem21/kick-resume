// import React from 'react'
// import { UserInfoForm } from '@/components/resume-builder/UserInfoForm'

// const page = () => {
//   return (
//     <div className='bg-primaryColor pt-20 pb-20 flex justify-center'>
//     <UserInfoForm/>
//     </div>
//   )
// }

// export default page


'use client'

import { useSearchParams } from 'next/navigation'
import TemplateOne from '@/components/templates/TemplateOne'
import TemplateTwo from '@/components/templates/TemplateTwo'
import TemplateThree from '@/components/templates/TemplateThree'
import React from 'react'
import { UserInfoForm } from '@/components/resume-builder/UserInfoForm'



const ResumeBuilderPage = () => {

  const searchParams = useSearchParams()
  const templateId = searchParams.get('template')
  console.log('Selected Template ID:', templateId);
  

   let SelectedTemplateComponent = null

  if (templateId === '1') {
    SelectedTemplateComponent = <TemplateOne />
  } else if (templateId === '2') {
    SelectedTemplateComponent = <TemplateTwo />
  } else if (templateId === '3') {
    SelectedTemplateComponent = <TemplateThree />
  }

  return (
    <div className="p-6 bg-primaryColor">
      <h1 className="text-2xl font-bold mb-4">Resume Builder</h1>

      <div className="grid grid-cols-[40%,60%] gap-3">
<UserInfoForm />

{SelectedTemplateComponent || (
        <p className="text-gray-500">Please select a template first.</p>
      )}
      </div>

      
    </div>
  )
}


export default ResumeBuilderPage
