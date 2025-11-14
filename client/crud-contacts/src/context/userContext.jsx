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

  const handleSubmit = (e) => {
    e.preventDefault()
    const newUser = {
      name,
      email,
      phone,
      genre
    };
    setUsers([...users, newUser]);
    cleanData();
    addContact();
  }

  const cleanData = () => {
    setName('');
    setEmail('');
    setPhone('');
    setGenre(null);
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
    users
  }



  return (
    <CrudContext.Provider value={value}>
      {children}
    </CrudContext.Provider>
  )
}

export { CrudContextProvider, CrudContext };