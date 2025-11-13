import React from 'react'

function Header() {
  return (
    <header>
      <h1 className="italic text-neutral-sand text-shadow-md text-shadow-accent-warm font-bold text-3xl text-center">
        <span className='mr-2.5'><i className="fa-solid fa-book"></i></span>
        Agenda de Contactos
      </h1>
    </header>
  )
}

export { Header };