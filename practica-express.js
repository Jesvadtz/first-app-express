/*
PRÁCTICA:

GET /koders
> Va a regresar un json con una lista de koders (arreglo de koders)
> La lista de koders vendrá de un archivo .json
> Leer el archivo koders.js con File System

*/

// Importar módulo de express
const express = require("express")

// Creación del servidor
const server = express() 

// Recibir json en nuestros request
server.use(express.json()) 

server.get('/', (request, response)=>{
    response.send('Hello World');
})

// Importar file system
const fs = require("fs");

server.get('/koders', (request, response) => {

    fs.readFile("koders.json", "utf8", (error, data) => {
        if (error) {
          console.log("No se leyó el archivo");
          return;
        }
        console.log('data', data)
        const koders = JSON.parse(data)
        response.json(koders)
        response.end()
        response.status(200)
      });
})

// Crear un nuevo koder
server.post('/koders', (request, response)=>{

})

server.listen(8080, ()=>{
    console.log("Server running on port: 8080")
})
