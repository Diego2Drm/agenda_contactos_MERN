import { createContext, useEffect, useState } from "react";
import Axios from 'axios'
import { validateContact, validatePartialContact } from "../schemas/formSchemas";
import { z } from 'zod'

const CrudContext = createContext();

const CrudContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [genre, setGenre] = useState(null);


  const addName = (e) => setName(e.target.value);
  const addEmail = (e) => setEmail(e.target.value);
  const addPhone = (e) => setPhone(e.target.value);

  const chooseGenre = (e) => {
    setGenre(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // const newUser = {
    //   name,
    //   email,
    //   phone,
    //   genre
    // };
    // setUsers([...users, newUser]);

    try {
      if (edit)
        await patchContact(getID)
      else {
        await addContact();
      }
    } catch (err) {
      console.error('Taks not add', err);
    }

    await getContacts();
  }

  const cleanData = () => {
    setName('');
    setEmail('');
    setPhone('');
    setGenre(null);
    setEdit(false);
  };

  // ROUTES --> CRUD <------------
  // POST --> CREATE
  const [errorsInputs, setErrorsInputs] = useState([]);
  const addContact = async () => {

    const result = validateContact({
      name: name,
      email: email,
      phone_number: phone,
      genre: genre
    })

    if (!result.success) {
      const formattedErros = z.treeifyError(result.error);
      setErrorsInputs(formattedErros);
      console.error("Errores de validación", formattedErros);
      return;
    }

    setErrorsInputs([]);

    try {
      await Axios.post('http://localhost:3000/contacts', result.data);
      console.log('Add Contact ✅');
      cleanData();
    } catch (error) {
      console.error('Not add ❌', error);
    }
  }

  const [errorMessage, setErrorMessage] = useState(null);

  // GET --> READ
  const getContacts = async () => {
    try {
      await Axios.get('http://localhost:3000/contacts').
        then(res => { setUsers(res.data) })
    } catch (error) {
      console.error('Data not Found', error.message);
      setErrorMessage(error.message || 'Error al obtener Contactos')
    }
  }

  useEffect(() => {
    getContacts();
  }, [])

  // PATCH/PUT --> EDIT
  const [edit, setEdit] = useState(false);
  const [getID, setGetId] = useState(null);
  const editContact = (val) => {
    setEdit(true)
    setName(val.name);
    setEmail(val.email);
    setPhone(val.phone_number);
    setGenre(val.genre);
    setGetId(val.id)
  }

  const patchContact = async (id) => {

    const result = validatePartialContact({
      name: name,
      email: email,
      phone_number: phone,
      genre: genre
    })

    if (!result.success) {
      const formattedErros = z.treeifyError(result.error);
      setErrorsInputs(formattedErros);
      console.error("Errores de validación", formattedErros);
      return;
    }

    setErrorsInputs([]);
    try {
      await Axios.patch(`http://localhost:3000/contacts/${id}`, result.data).then(() => {
        setEdit(false);
        setGetId(null);
        cleanData();
        getContacts();
      })
    } catch (error) {
      console.error('Not add ❌', error);
    }
  }

  // DELETE --> DELETE
  const deleteContact = (id) => {
    Axios.delete(`http://localhost:3000/contacts/${id}`)
      .then(() => {
        getContacts()
      })

  }


  // ---------->

  const value = {
    name,
    handleSubmit,
    addName,
    addEmail,
    addPhone,
    chooseGenre,
    name,
    email,
    phone,
    genre,
    users,
    errorMessage,
    edit,
    editContact,
    cleanData,
    deleteContact,
    errorsInputs,
  }

  return (
    <CrudContext.Provider value={value}>
      {children}
    </CrudContext.Provider>
  )
}

export { CrudContextProvider, CrudContext };