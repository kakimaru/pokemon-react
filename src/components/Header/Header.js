import React, { useState } from 'react'

const Header = ({jaBtn, isJapanese}) => {

  return (
    <header className='sticky top-0 px-8 py-4 flex justify-between items-center bg-gray-900 border-b border-gray-600'>
      <h1 className='text-white font-bold text-3xl'>Pokemon encyclopedia</h1>
      <div>
        <button className='btn__language text-white' onClick={jaBtn}>{isJapanese ? 'English' : '日本語'}</button>
      </div>
    </header>
  )
}

export default Header