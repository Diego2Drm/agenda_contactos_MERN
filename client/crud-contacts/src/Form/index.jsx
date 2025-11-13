import React from 'react'

function Form() {
  return (
    <div>
      <form>

        <label className='label__user'>
          <span><i className="fa-solid fa-user"></i></span>
          <input type="text" name="name" placeholder='Nombre...' />
        </label>

        <label className='label__user'>
          <span><i className="fa-solid fa-envelope"></i></span>
          <input type="text" name="email" placeholder='Correo electronico...' />
        </label>

        <label className='label__user'>
          <span><i className="fa-solid fa-phone"></i></span>
          <input type="text" name="phone" placeholder='Numero de telefono...' />
        </label>

        <div>
          <h3 className='text-accent-warm font-semibold italic'>Escoge el Género</h3>
          <label>
            <input type="radio" name="genero" value="masculino" />
            <span> Masculino</span>
          </label>

          <label>
            <input type="radio" name="genero" value="femenino" />
            <span> Femenino</span>
          </label>

          <label>
            <input type="radio" name="genero" value="no_especificar" />
            <span> Prefiero no especificar</span>
          </label>
        </div>

      </form>
    </div>
  )
}

export { Form };