import React from 'react'
import { useCrudContext } from '../../Hooks/useCrudContext';

function Form() {
  const { handleSubmit, addName, addEmail,
    addPhone, chooseGenre, name, email, phone, genre, edit, cleanData } = useCrudContext()

  return (
    <div>
      <form onSubmit={handleSubmit}>

        <label className='label__user'>
          <span><i className="fa-solid fa-user"></i></span>
          <input type="text" name="name" placeholder='Nombre...'
            onChange={addName}
            required
            value={name}
          />
        </label>

        <label className='label__user'>
          <span><i className="fa-solid fa-envelope"></i></span>
          <input type="text" name="email" placeholder='Correo electronico...'
            onChange={addEmail}
            value={email}
          />
        </label>

        <label className='label__user'>
          <span><i className="fa-solid fa-phone"></i></span>
          <input type="text" name="phone" placeholder='Numero de telefono...'
            onChange={addPhone}
            required
            value={phone}
          />
        </label>

        <div className='form-genre'>
          <h3 className='text-accent-warm font-semibold italic'>Escoge el Género</h3>
          <label>
            <input type="radio" name="genero" value="masculino"
              onChange={chooseGenre}
              checked={genre === 'masculino'}
            />
            <span> Masculino</span>
          </label>

          <label>
            <input type="radio" name="genero" value="femenino"
              onChange={chooseGenre}
              checked={genre === 'femenino'}
            />
            <span> Femenino</span>
          </label>

          <label>
            <input type="radio" name="genero" value="no_especificar"
              onChange={chooseGenre}
              checked={genre === 'no_especificar'}
            />
            <span> Prefiero no especificar</span>
          </label>
        </div>

        <div className='md:flex md:justify-center gap-5'>
          {
            edit ? <button
              type="submit"
              className='bg-accent-green py-2 rounded-lg text-white hover:shadow-lg hover:shadow-neutral-light duration-200 ease-in-out cursor-pointer w-full md:w-96'>
              Editar Contacto
            </button>
              :
              <button
                type="submit"
                className='bg-accent-blue py-2 rounded-lg text-white hover:shadow-lg hover:shadow-neutral-light duration-200 ease-in-out cursor-pointer w-full md:w-96'>
                Agregar Contacto
              </button>
          }

          <button type='button' onClick={cleanData}
            className='bg-red-800 py-2 rounded-lg text-white hover:shadow-lg hover:shadow-neutral-light duration-200 ease-in-out cursor-pointer w-full md:w-96 mt-5 md:mt-0'
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export { Form };