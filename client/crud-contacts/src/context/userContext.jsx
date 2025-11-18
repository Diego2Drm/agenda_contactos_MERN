import { createContext, useEffect, useState } from "react";
import Axios from 'axios'

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

    cleanData();
    await getContacts();
  }

  const cleanData = () => {
    setName('');
    setEmail('');
    setPhone('');
    setGenre(null);
    setEdit(false);
  };

  // ROUTES
  const addContact = async () => {
    try {
      await Axios.post('http://localhost:3000/contacts', {
        name: name,
        email: email,
        phone_number: phone,
        genre: genre
      });
      console.log('Add Contact ✅');
    } catch (error) {
      console.error('Not add ❌', error);
    }
  }

  const [errorMessage, setErrorMessage] = useState(null);

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
    try {
      await Axios.patch(`http://localhost:3000/contacts/${id}`, {
        name: name,
        email: email,
        phone_number: phone,
        genre: genre
      }).then(() => {
        setEdit(false);
        setGetId(null);
        getContacts();
      })
    } catch (error) {
      console.error('Not add ❌', error);
    }
  }

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
  }

  return (
    <CrudContext.Provider value={value}>
      {children}
    </CrudContext.Provider>
  )
}

export { CrudContextProvider, CrudContext };