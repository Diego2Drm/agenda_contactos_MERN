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