const express = require('express')
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const password = process.env.DB_PASSWORD;
const app = express();
app.use(express.json());
app.use(cors());

// Connection to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: password,
  database: 'crud_contacts'
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello MERN')
})

app.post('/contacts', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone_number = req.body.phone_number;
  const genre = req.body.genre;

  db.query('INSERT INTO contact_list (name,email,phone_number,genre) VALUES(?,?,?,?)', [name, email, phone_number, genre],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Add Contact')
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

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server lsitening on port http://localhost:${PORT}`);
})