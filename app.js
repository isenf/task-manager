const express = require('express');
const mongoose = require('mongoose');

const authRouter = require('./routes/authRoutes');
const taskRouter = require('./routes/taskRoutes');

require('dotenv').config();
const dbURL = process.env.DATABASE_URL;
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use('/auth', authRouter);
app.use('/tasks', taskRouter);

app.set('view engine', 'ejs');

mongoose.connect(dbURL)
    .then((result) => app.listen(port))
    .catch((err) => console.log('error at connecting with the db',err))