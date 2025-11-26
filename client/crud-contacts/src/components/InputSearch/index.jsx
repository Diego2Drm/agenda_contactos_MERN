import React from 'react'
import { useCrudContext } from '../../hooks/useCrudContext'

function InputSeach() {
  const { handleSearch } = useCrudContext()

  return (
    <div className='my-10 flex flex-col'>
      <label htmlFor="buscar"
        className='text-accent-green font-bold font-mono text-lg bg-accent-cream rounded-tl-lg rounded-tr-lg p-1'
      >
        Buscar Contacto por su Nombre
      </label>
      <input type="search" id='buscar' placeholder='Buscar Contacto...'
        className='placeholder:text-neutral-light border-2 border-neutral-sand rounded-bl-lg rounded-br-lg p-1 text-neutral-light'
        onChange={handleSearch}
      />
    </div>
  )
}

export { InputSeach };