import React from 'react'

const Footer = () => {
  return (
    <footer className='py-4 flex gap-4 justify-center items-center bg-gray-900 border-t border-gray-600'>
      <p className='text-gray-400'>This project utilizes data from the <a className='text-gray-400 hover:text-purple-600' href="https://pokeapi.co/" target='_blank' rel='noopener noreferrer' >Poke API</a></p>
      
    </footer>
  )
}

export default Footer