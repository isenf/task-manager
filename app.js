const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const dbURL = process.env.DATABASE_URL;

//acho que eu tenho tdah...
const app = express();

app.use(express.static('public'));
app.use(express.json());


app.set('view engine', 'ejs');

mongoose.connect(dbURL)
    .then((result) => console.log('database is connected'))
    .catch((err) => console.log('error at connecting with the db',err));