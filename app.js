const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
require('dotenv').config();

const authRouter = require('./routes/authRoutes');
const taskRouter = require('./routes/taskRoutes');
const { checkUser } = require('./middleware/authMiddleware');

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
    .then((result) => {
        console.log('successfully connected with the db');
        app.listen(port, () =>{
            console.log(`server listening at ${port}`)
        });
    })
    .catch((err) => console.log('error at connecting with the db', err));

app.use("*", checkUser);

app.get('/', (req, res) => {
    res.render('home');
});

app.use('/auth', authRouter);
app.use('/task', taskRouter); 

app.use((err, req, res, next) =>{
    console.error(err.stack);
    res.status(500).render('error', {message: 'something went wrong :/'});
});