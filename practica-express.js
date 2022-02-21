/*
PRÁCTICA: Método GET /koders
> Va a regresar un json con una lista de koders (arreglo de koders)
> La lista de koders vendrá de un archivo .json
> Leer el archivo koders.js con File System
*/

// Importar módulo de express
const { response } = require("express");
const express = require("express");

// Creación del servidor
const server = express();

// Recibir json en nuestros request
server.use(express.json()); // Convierte el json a un objeto en javascript

// Importar file system
const fs = require("fs");

// fs.readFile() : Callbacks
// fs.readFileSync() : Síncrona
// fs.promises.readFile(): Promesa

// server.get("/koders", async (request, response) => {
//   // const  content = fs.readFileSync('./koders.json', 'utf8')

//   const content = await fs.promises.readFile("./koders.json");
//   const json = JSON.parse(content); // convierte de string a objeto
//   response.json(json);

//   // fs.readFile("koders.json", "utf8", (error, data) => {
//   //     if (error) {
//   //       console.log("No se leyó el archivo");
//   //       return;
//   //     }
//   //     console.log('data', data)
//   //     const koders = JSON.parse(data)
//   //     response.json(koders)
//   //     // response.end()  Ya no es necesario porque responde.json termina la respuesta
//   //     response.status(200)
//   //   });
// });

// GET por ID
server.get("/koders/:id", async (request, response) => {
  const idKoder = request.params.id;
  const content = await fs.promises.readFile("./koders.json");
  const json = JSON.parse(content);

  const targetKoder = json.koders.find((koder) => {
    return parseInt(koder.id) === parseInt(idKoder);
  });
  console.log(targetKoder);
  response.json(targetKoder);
});

// Crear un nuevo koder con POST
server.post("/koders", async (request, response) => {
  const newKoder = request.body; // Recibimos la información

  const content = await fs.promises.readFile("./koders.json"); // Mi archivo .json es un string
  const json = JSON.parse(content); // Pasar de string a objeto JSON
  json.koders.push(newKoder); // Hacer push al objeto
  console.log(json);

  await fs.promises.writeFile(
    "./koders.json",
    JSON.stringify(json, null, 2), // Darle formato al archivo
    "utf8"
  );

  response.json({
    succes: true,
  });
});

// Update koder con PATCH
// Path parameters
// Sintaxis universal
// PATCH /recursos/identificador
// PATCH /koders/:id

// EN REQUEST ES DONDE MANDAMOS LA INFORMACIÓN

server.patch("/koders/:id", async (request, response) => {
  console.log("id: ", request.params.id);
  const idKoder = request.params.id;
  const name = request.body.name;
  const content = await fs.promises.readFile("./koders.json");
  const json = JSON.parse(content);
  console.log("json: ", json);
  // forEach
  // map
  // filter
  // reduce
  const newKoders = json.koders.map((koder, index) => {
    if (parseInt(koder.id) === parseInt(idKoder)) {
      koder.name = name;
    }
    return koder;
  });
  console.log("newKoders");
  console.log(newKoders);

  json.koders = newKoders;

  await fs.promises.writeFile(
    "./koders.json",
    JSON.stringify(json, null, 2),
    "utf8"
  );
  response.json({
    success: true,
  });
});

// Borrar a un koder
server.delete("/koders/:id", async (request, response) => {
  const idKoder = request.params.id; // Perdir el id del koder
  const content = await fs.promises.readFile("./koders.json");
  const json = JSON.parse(content);

  const newKoders = json.koders.filter((koder) => {
    return koder.id !== idKoder;
  });
  console.log(newKoders);

  json.koders = newKoders;

  await fs.promises.writeFile(
    "./koders.json",
    JSON.stringify(json, null, 2),
    "utf8"
  );
  response.json({
    success: true,
  });
});

// Puerto
server.listen(8080, () => {
  console.log("Server running on port: 8080");
});

/**
 * Práctica
Un endpoint para borrar a un koder por su id
DELETE /koders/:id
Endpoint para obtener a un koder por su id
GET /koders/:id
 */
