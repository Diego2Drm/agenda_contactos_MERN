import { createContext, useState } from "react";

const CrudContext = createContext();

const CrudContextProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [genre, setGenre] = useState(null);
  const [user, setUser] = useState({});

  const addName = (e) => setName(e.target.value);
  const addEmail = (e) => setEmail(e.target.value);
  const addPhone = (e) => setPhone(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault()
    setUser({
      name: name,
      email: email,
      phone: phone,
      genre: genre
    })
  }

  console.log(user);

  const chooseGenre = (e) => {
    setGenre(e.target.value)
  }

  const value = {
    name,
    handleSubmit,
    addName,
    addEmail,
    addPhone,
    chooseGenre,
  }

  return (
    <CrudContext.Provider value={value}>
      {children}
    </CrudContext.Provider>
  )
}

export { CrudContextProvider, CrudContext };