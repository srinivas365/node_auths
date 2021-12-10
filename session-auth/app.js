const express = require('express');
const appRoutes = require('./routes/appRoutes');
const session = require('express-session');
const connectSqlite = require('connect-sqlite3');

const SQLiteStore = connectSqlite(session);

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({
    store: new SQLiteStore({
        dir: './database/',
        db: 'sessions',
        table: 'sessions'
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60,
        sameSite: true
    }
}));

app.use(appRoutes);

app.listen(3001,()=>{
    console.log(`listening to port 3001`);
})

