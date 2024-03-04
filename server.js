const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const host = process.env.HOST
const PORT = process.env.PORT || 3000;
const URL_MONGOOSE = process.env.URL_MONGOOSE;
const DBNAME = process.env.DBNAME;

var app = express()

app.use(express.json());

mongoose.connect(URL_MONGOOSE, { useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', (err) => console.log(`Error connecting to database ${err}`));
db.once('open', () => console.log('Connected to Database'));

// Routes
app.use('/authors', require('./Routes/authors'));
app.use('/publishers', require('./Routes/publishers'));
app.use('/books', require('./Routes/books'));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
