import React from 'react'
import { useCrudContext } from '../../Hooks/useCrudContext';
import { Cards } from './Cards';
import { Table } from './Table';


function Users() {
  const { users, errorMessage } = useCrudContext();

  return (
    <section>
      {
        errorMessage && <p className='text-red-500'>{errorMessage}</p>
      }

      <Table users={users} />
      <Cards users={users} />


    </section>
  )
}

export { Users };