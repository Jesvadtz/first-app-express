const express = require("express")

const server = express() // Nos regresará un servidor

// Middleware

server.use(express.json()) // Nos va a permitir recibir json en nuestros request

/* Ejercicio 1: Validar dos rutas 
GET /koders : Aquí están todos los koders
POST /koders : Aquí puedes crear koders
PUT /kooders : Aquí puedes sustituir a koders
*/

// server.get('/koders', (request, response)=>{
//     response.write('Aquí están todos los koders')
//     response.end()
// })
// server.post('/koders', (request, response)=>{
//     response.write('Aquí puedes crear koders')
//     response.end()
// })
// server.put('/koders', (request, response)=>{
//     response.write('Aquí puedes sustituir a koders')
//     response.end()
// })


// Setea el header y convierte por nosotros el objeto json a string
server.get('/koders', (request, response)=>{
    // response.writeHead(400,{'Content-Type':"aplicaction/jason"})
    // const json={
    //     mesaage: 'ok'
    // }
    // const jsonString = JSON.stringify(json)
    // response.write(jsonString)
    // response.end()

    // Express
    response.status(201)
    response.json({
        message:'koders'
    })
})

server.post('/koders', (request, response)=>{
    const body = request.body
    console.log('body', body)
    console.log('body-name',body.name)

    response.json({
        message:'oki'
    })
})

server.listen(8080, ()=>{
    console.log("Server running on port: 8080")
})
// server.get('/hola', (request, response)=>{
//     response.write('GET /hola')
//     response.end()
// })
// server.post('/hola', (request, response)=>{
//     response.write('POST /hola')
//     response.end()
// })

/*
Endpoint:
Es el conjuto de un METODO Y UNA RUTA
GET /koders
POST /koders
PUT /koders
PATCH /koders
*/
