import { createContext, useEffect, useState } from "react";
import Axios from 'axios'
import { validateContact, validatePartialContact } from "../schemas/formSchemas";
import { z } from 'zod'
import Swal from "sweetalert2";

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
    setGetId(null)
  };

  // ROUTES --> CRUD <------------
  // POST --> CREATE
  const [errorsInputs, setErrorsInputs] = useState([]);
  const addContact = async () => {
    try {
      const result = validateContact({
        name: name,
        email: email,
        phone_number: phone,
        genre: genre
      })

      if (!result.success) {
        const formattedErros = z.treeifyError(result.error);
        setErrorsInputs(formattedErros);
        // console.error("Errores de validación", formattedErros);
        // throw new Error("Errores de validación"); // 👈 aquí lanzas el error

        Swal.fire({
          icon: "error",
          title: "Error de validación",
          text: "Revisa los campos obligatorios antes de continuar.",
        });

        return; // 👈 no intentes postear
      }

      setErrorsInputs([]);

      await Axios.post('http://localhost:3000/contacts', result.data)
        .then(() => {
          Swal.fire({
            title: "<strong>Registro Exitoso</strong>",
            html: `Felicidades agregaste al contacto </strong>${name}<strong>`,
            icon: "success"
          })
          cleanData();
        })
    } catch (error) {
      console.error('Not add ❌', error);
      if (error.response?.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Error de validación",
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error del servidor",
          text: error.response?.data?.message || "Intenta más tarde.",
        });
      }
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
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
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
        Swal.fire({
          title: "<strong>Edición Exitosa</strong>",
          html: `Editaste al contacto <strong>${name}</strong> correctamente`,
          icon: "success"
        })
        getContacts();
      })
    } catch (error) {
      console.error('Not add ❌', error);
      if (error.response?.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Error de validación",
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error del servidor",
          text: error.response?.data?.message || "Intenta más tarde.",
        });
      }
    }
  }

  // DELETE --> DELETE
  const deleteContact = (id) => {

    Swal.fire({
      title: "<strong>Eliminar Contacto</strong>",
      html: `<strong>¿Seguro que quieres eliminar este contacto?</strong>`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3000/contacts/${id}`)
          .then(() => {
            getContacts()
          })
        Swal.fire(
          "Eliminado",
          'Ya no esta en tu Agenda',
          "success"
        )
      }
    }).catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Oops..",
        html: "<strong>El Contacto no fue eliminado!!</strong>",
        footer: JSON.parse(JSON.stringify(err)).message === "Network Error" ? "Try later" : JSON.parse(JSON.stringify(err)).message == "Network Error"
      })
    })
  };


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
    getID,
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