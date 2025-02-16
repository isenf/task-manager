const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const authRouter = require('./routes/authRoutes');
const taskRouter = require('./routes/taskRoutes');
const { checkUser } = require('./middleware/authMiddleware');

require('dotenv').config();
const dbURL = process.env.DATABASE_URL;
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

mongoose.connect(dbURL)
    .then((result) => app.listen(port))
    .catch((err) => console.log('error at connecting with the db', err));

app.use(checkUser);

app.get('/', (req, res) => {
    res.render('home');
});

app.use('/auth', authRouter);
app.use('/task', taskRouter); 

app.get('/favicon.ico', (req, res) => res.status(204).end());