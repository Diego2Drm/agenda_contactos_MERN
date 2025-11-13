import React from 'react'
import { useCrudContext } from '../../Hooks/useCrudContext';

function Form() {
  const { handleSubmit, name, addName, addEmail,
    addPhone, chooseGenre } = useCrudContext()

  return (
    <div>
      <form onSubmit={handleSubmit}>

        <label className='label__user'>
          <span><i className="fa-solid fa-user"></i></span>
          <input type="text" name="name" placeholder='Nombre...'
            onChange={addName}
            required
          />
        </label>

        <label className='label__user'>
          <span><i className="fa-solid fa-envelope"></i></span>
          <input type="text" name="email" placeholder='Correo electronico...'
            onChange={addEmail}
            required
          />
        </label>

        <label className='label__user'>
          <span><i className="fa-solid fa-phone"></i></span>
          <input type="text" name="phone" placeholder='Numero de telefono...'
            onChange={addPhone}
            required
          />
        </label>

        <div>
          <h3 className='text-accent-warm font-semibold italic'>Escoge el Género</h3>
          <label>
            <input type="radio" name="genero" value="masculino"
              onChange={chooseGenre}
            />
            <span> Masculino</span>
          </label>

          <label>
            <input type="radio" name="genero" value="femenino"
              onChange={chooseGenre}
            />
            <span> Femenino</span>
          </label>

          <label>
            <input type="radio" name="genero" value="no_especificar"
              onChange={chooseGenre}
            />
            <span> Prefiero no especificar</span>
          </label>
        </div>

        <button type="submit">Agregar Contacto</button>
      </form>
    </div>
  )
}

export { Form };