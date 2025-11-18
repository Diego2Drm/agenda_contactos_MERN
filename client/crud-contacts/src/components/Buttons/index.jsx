import React from 'react'

function Buttons({ handleEdit, handleDelete }) {

  return (
    <div className='flex justify-center gap-x-5' >
      <button className='bg-accent-blue/80 py-1 px-2 border rounded text-xs text-white cursor-pointer active:scale-75 hover:bg-accent-blue duration-200 ease-in-out'
        onClick={handleEdit}
      >
        Editar
      </button>
      <button className='bg-red-500 py-1 px-2 border rounded text-xs text-white cursor-pointer active:scale-75 hover:bg-red-700 duration-200 ease-in-out'
        onClick={handleDelete}
      >
        Eliminar
      </button>
    </div>)
}

export { Buttons };