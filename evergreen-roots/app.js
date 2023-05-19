import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import sessions from 'express-session';
import logger from 'morgan';
import msIdExpress from 'microsoft-identity-express'

const appSettings = {
    appCredentials: {
        clientId:  "7774905c-a538-4b27-b423-51990c253cad",
        tenantId:  "f6b6dd5b-f02f-441a-99a0-162ac5060bd2",
        clientSecret:  "Zc_8Q~ryt5XSTM~v.dm1l0glu.OioGlQRgbr7aZ~"
    },	
    authRoutes: {
        redirect: "https://collabor-action.azurewebsites.net/redirect",
        error: "/error", 
        unauthorized: "/unauthorized" 
    } 
};

import models from './models.js'
import apiRouter from './routes/api/api.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const oneHour = 1000 * 60 * 60 * 1
app.use(sessions({
    secret: "anspodjqwjebjDKIWdd",
    saveUninitialized: true,
    cookie: {maxAge: oneHour},
    resave: false
}))

// app.get('/', (req, res, next) => {
//     if(!req.session.isAuthenticated){
//     res.redirect('/signin')
//     } else{
//         next();
//     }
// })

app.use((req, res, next) => {
    req.models = models
    next()
})

const msid = new msIdExpress.WebAppAuthClientBuilder(appSettings).build()
app.use(msid.initialize())

app.use('/api', apiRouter);

app.get('/signin', 
    msid.signIn({postLoginRedirect: '/'})
)

app.get('/signout',
    msid.signOut({postLogoutRedirect: '/'})
)

app.get('/error', (req, res) => {
    res.status(500).send("Error: Server error")
})

app.get('/unauthorized', (req, res) => {
    res.status(401).send("Error: Unauthorized")
})

export default app;
