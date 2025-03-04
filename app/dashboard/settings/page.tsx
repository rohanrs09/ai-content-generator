import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function Settings() {
  return (
    <div className='flex justify-center w-full pt-6 md:pt-8 lg:pt-10 px-4 sm:px-6 md:px-8'>
      <UserProfile routing="hash" />
    </div>
  )
}

export default Settings