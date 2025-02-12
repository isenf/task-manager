const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/authRoutes');
const taskRouter = require('./routes/taskRoutes');
const { checkUser } = require('./middleware/authMiddleware');

require('dotenv').config();
const dbURL = process.env.DATABASE_URL;
const port = process.env.PORT || 3000;
const secretKey = process.env.SECRET_KEY;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');

mongoose.connect(dbURL)
    .then((result) => app.listen(port))
    .catch((err) => console.log('error at connecting with the db',err))

app.use('/auth',authRouter);
app.get('/*', checkUser);
app.use(taskRouter);