require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const uuid = require('uuid');
const ctrl = require('./controller');
const authCtrl = require('./auth_controller');
const PORT = 5000;

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({
    secret: uuid.v4(),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 60 * 24
    }
}));

massive(process.env.CONNECTION_STRING).then(database => {
    app.set('db', database);
})
app.get('/api/join-data', ctrl.joinUserData);
app.get('/api/user-data', ctrl.getUserData);
app.get('/api/posts/:id', ctrl.getPost);
app.get('/auth/callback', authCtrl.login);
app.post('/api/logout', authCtrl.logout);
app.post('/api/posts', ctrl.createPost);

app.listen(PORT, () => console.log(`Listening on Port:${PORT}.`));
