import React, { useState } from 'react'

const Card = ({data, isJapanese}) => {

  return (
    <div className='bg-gray-700 p-4 flex flex-col gap-4 items-center'>
      <img className='w-10/12' src={data.sprites.front_default} alt="" />
      <div className='w-full'>
        <p className='text-xs'>No.{data.id}</p>
        <p>{isJapanese ? data.japaneseName  : data.name}</p>
      </div>
      <div className='flex gap-2 w-full'>
        {
        isJapanese 
        ? data.japaneseTypes.map(type => {
          return <p className='text-sm'>{type}</p>
          })
        : 
          data.types.map(type => {
            return <p key={type.type.name} className='text-sm'>{type.type.name}</p>
          })
        }
      </div>
    </div>
  )
}

export default Card