const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const mongoSession = require('connect-mongodb-session')(session);
const path = require('path');
const ejs = require('ejs');
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const { error } = require('console');
const routes = require('./routes/homeroutes');

const app = express();

const dbURI = 'mongodb://localhost:27017/users-db';
mongoose.connect(dbURI).then(console.log('Connected to Database !'));

app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: false,
    store: new mongoSession({
        uri: dbURI,
        collection: 'session'
    })
}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');

const staticFilesDirectory = path.join(__dirname, 'public');
app.use(express.static(staticFilesDirectory));

const isAuth = (req, res, next) => {
    if(req.session.isAuth){
        next()
    }else{
        res.redirect('/login');
    }
}

app.get('/dashboard', isAuth, (req, res) => {
    res.render('dashboard', {title: 'Dashboard'});
})

app.use('/', routes);


app.get('/data',async (req, res) => {
    try{
        const data = await User.find({username: req.query.username});
        res.json(data);
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));