const express = require('express')
const cors = require('cors');
const { PORT } = require('./config');
const { db } = require('./db');

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Hello MERN')
})

app.post('/contacts', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone_number = req.body.phone_number;
  const genre = req.body.genre;

  if (!name?.trim() || !email?.trim() || !phone_number?.toString().trim() || !genre?.trim()) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  db.query('SELECT * FROM contact_list WHERE email = ?',
    [email],
    (err, result) => {
      if (err) {
        console.log('Error', err);
        return res.status(500).json({ error: 'Error en el servidor"' })
      }

      if (result.length > 0) return res.status(400).json({ message: 'Este correo ya está registrado' })
    }
  )

  db.query('INSERT INTO contact_list (name,email,phone_number,genre) VALUES(?,?,?,?)', [name, email, phone_number, genre],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error interno del servidor." });
      } else {
        res.status(201).json({ message: "Contacto agregado correctamente ✅" });
      }
    })
})

app.get('/contacts', (req, res) => {
  db.query('SELECT id,name,email,phone_number,genre FROM contact_list',
    (err, result) => {
      if (err) {
        console.log('Data Not Found', err);

        return res.status(500).json(
          {
            message: 'Error al obtener contactos desde la base de datos',
            error: err.message
          }
        )
      } else {
        res.send(result)
      }
    }
  )
})

app.patch('/contacts/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name;
  const email = req.body.email;
  const phone_number = req.body.phone_number;
  const genre = req.body.genre;

  db.query('UPDATE contact_list SET name=?,email=?,phone_number=?,genre=? WHERE id=?',
    [name, email, phone_number, genre, id],
    (err, result) => {
      if (err) {
        res.status(500).send(err)
        console.log('Contact No Update');
      } else {
        res.send(result)
      }
    }
  )
})

app.delete('/contacts/:id', (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM  contact_list WHERE id=?',
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result)
      }
    }
  )
})



app.listen(PORT, () => {
  console.log(`Server lsitening on port http://localhost:${PORT}`);
})