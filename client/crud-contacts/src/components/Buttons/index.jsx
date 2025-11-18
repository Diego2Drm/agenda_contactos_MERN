import React from 'react'

function Buttons({ handleEdit }) {

  return (
    <div className='flex justify-center gap-x-5' >
      <button className='bg-accent-blue/80 py-1 px-2 border rounded text-xs text-white cursor-pointer active:scale-75'
        onClick={handleEdit}
      >
        Editar
      </button>
      <button className='bg-red-500 py-1 px-2 border rounded text-xs text-white cursor-pointer active:scale-75'>
        Eliminar
      </button>
    </div>)
}

export { Buttons };