/*
    importar modulo http
const http = require('http');

    (require, respuesta)
const server = http.createServer((req, res) => {
    res.status = 200;
        tipo de contenido
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World')
})

server.listen(3000, () => {
    console.log('Serve on port 3000')
})

*/

// npm init -y (crear package.json)

const express = require('express');
const morgan = require('morgan'); //middleware
const app = express();


            // SETTINGS

// variables: nombre de variable, valor de variable
app.set('appName', 'Fazt Express Tutorial');
app.set('port', '3000');
// ejs es un motor de plantillas que no hace falta configurar
// solo hay que instalarlo
app.set('view engine', 'ejs')





/* 
// procesar datos antes de que lleguen a las rutas
// el middleware es un manejador de peticion que se puede ejecutar 
// antes de que  llegue a su ruta original - cualquier ruta
function logger(req, res, next) {

    // protocolo por el cual el usuario envia la peticion
    // localhost
    // ver ruta del usuario
    console.log(`Route received: ${req.protocol}://${req.get('host')}${req.originalUrl}`)
    next();
} */

            // MIDDLEWARE
app.use(express.json());
//para que express entineda los objetos json
// antes de que llegue a cualquier rut
// transforma a un objeto json si es necesario

// app.use(logger);

app.use(morgan('dev'))



            // ROUTES

// para hacer algo antes que se ejecute lo demas
// para todas las rutas user
app.all('/user', (req, res, next) => {
    console.log('Por aqui paso');
    next(); //indica que continue con lo que sigue
})

// app.get('/', (req, res) => {
//     res.send('GET REQUEST RECEIVED')
// })

app.get('/', (req, res) => {
    const data = [{name: 'john'}, {name: 'joe'}, {name: 'cameron'}, {name: 'ryan'}]
    res.render('index.ejs', {people: data})
    // cargar datos dinámicos
})

app.get('/user', (req, res) => {
    res.json({
        username: 'Cameron',
        lastname: 'Howe'
    })
})

app.post('/about', (req, res) => {
    res.send('POST REQUEST RECEIVED')
})

app.post('/user/:id', (req, res) => {
    // cuerpo de la peticion
    // tomar info que el cliente envia
    console.log(req.body);
    // parametro de la peticion
    // mas informacion de determinado recurso
    console.log(req.params)
    res.send('POST REQUEST RECEIVED')
})


app.put('/contact', (req, res) => {
    res.send('UPDATE REQUEST RECEIVED')
})

app.put('/user/:id', (req, res) => {
    console.log(req.body)
    res.send(`User ${req.params.id} updated`)
})

app.delete('/test', (req, res) => {
    res.send('<h1>DELETE REQUEST RECEIVED</h1>')
})

app.delete('/user/:userId', (req, res) => {
    res.send(`User ${req.params.userId} deleted`)
})

// enfviar archivos tipicos css js
app.use(express.static('public'))


app.listen(app.get('port'), () => {
    console.log(app.get('appName'))
    console.log('Server on port', app.get('port'))
})

