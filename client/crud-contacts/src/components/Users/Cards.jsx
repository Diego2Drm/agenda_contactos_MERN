import React from 'react'
import { Buttons } from '../Buttons';
import { useCrudContext } from '../../Hooks/useCrudContext';

function Cards({ users }) {
  const { getID, editContact, deleteContact } = useCrudContext();
  return (
    <div className="block md:hidden space-y-8 cards">
      {users.map((user) => (
        <div key={user.id} className={`${getID === user.id ? 'outline-8 outline-accent-green' : 'outline-0'}  p-4 rounded-xl shadow-lg shadow-neutral-sand bg-accent-warm`}>

          <p className='capitalize cards-text'>
            <span className='cards-span'>Nombre:</span> {user.name}
          </p>

          <p className='lowercase cards-text'>
            <span className='cards-span capitalize'>correo:</span> {user.email}
          </p>

          <p className='cards-text'>
            <span className='cards-span '>Numero:</span> {user.phone_number}
          </p>

          <p className='capitalize cards-text mb-5'>
            <span className='cards-span'>Género:</span> {user.genre}
          </p>

          <Buttons handleEdit={() => editContact(user)} handleDelete={() => deleteContact(user.id)} />
        </div>
      ))}
    </div>
  )
}

export { Cards };