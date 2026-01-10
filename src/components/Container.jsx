import React from 'react'

export default function Container({children}) {
  return (
    <div className='max-w-[2520] mx-auto zl:px-20 mdpx-10 sm:px-2 px-4'>
        {children}
    </div>
  )
}
