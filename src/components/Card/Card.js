import React from 'react'

const Card = ({data}) => {
  return (
    <div className='bg-gray-700 p-4 flex flex-col gap-4 items-center'>
      <img className='w-10/12' src={data.sprites.front_default} alt="" />
      <div className='w-full'>
        <p className='text-xs'>No.{data.id}</p>
        <p>{data.name}</p>
      </div>
      <div className='flex gap-2 w-full'>
        {data.types.map(type => {
          return <p key={type.type.name} className='text-sm'>{type.type.name}</p>
        })}
      </div>
    </div>
  )
}

export default Card