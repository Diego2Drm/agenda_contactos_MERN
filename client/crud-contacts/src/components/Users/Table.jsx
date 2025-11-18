import React from 'react'
import { Buttons } from '../Buttons'
import { useCrudContext } from '../../Hooks/useCrudContext';

function Table({ users }) {
  const { editContact, deleteContact } = useCrudContext()

  return (
    <div className='hidden md:block'>
      <table className='min-w-full border-collapse border border-gray-300'>
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Genre</th>
            <th className="border px-4 py-2">Opciones</th>
          </tr>
        </thead>
        <tbody >
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.phone_number}</td>
              <td className="border px-4 py-2">{user.genre}</td>
              <td className="border px-4 py-2">
                <Buttons handleEdit={() => editContact(user)} handleDelete={() => deleteContact(user.id)} />
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}

export { Table };