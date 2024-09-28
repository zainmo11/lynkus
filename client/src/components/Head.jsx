import React from 'react'

function Head() {
  return (
    <div className='flex items-center justify-start gap-2'>
        <img
            src="logo.png"
            className="h-14 rounded-full object-cover"
            alt="Logo"
        />
            <div className='flex flex-col'>
                <p className='font-semibold'>Sameh</p>
                <p className='font-thin'>@3abkr</p>
            </div>
    </div>
  )
}

export default Head