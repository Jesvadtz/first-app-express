const express = require("express");
const fs = require("fs");

// fs.readFile() : Callbacks
// fs.readFileSync() : Síncrona
// fs.promises.readFile(): Promesa

// Crear una instancia para poder usar el router
const router = express.Router(); // Se crea el router

async function getKoders() {
  const content = await fs.promises.readFile("./kodemia.json"); // Mi archivo .json es un string
  const json = JSON.parse(content); // Pasar de string a objeto JSON
  return json;
}

// GET Query Params
router.get("/", async (request, response) => {
  console.log("query params: ", request.query);
  const count = request.query.count;
  const gender = request.query.gender;
  const generation = request.query.generation;

  const json = await getKoders();

  let kodersData = json.koders;

  if (count) {
    kodersData = kodersData.slice(0, parseInt(count));
  }

  if (gender) {
    kodersData = kodersData.filter((genero) => {
      return genero.gender === gender;
    });
  }

  if (generation) {
    kodersData = kodersData.filter((koders) => {
      return parseInt(koders.generation) === parseInt(generation);
    });
  }

  // const  content = fs.readFileSync('./koders.json', 'utf8')

  response.json({
    koders: kodersData,
  });

  // fs.readFile("koders.json", "utf8", (error, data) => {
  //     if (error) {
  //       console.log("No se leyó el archivo");
  //       return;
  //     }
  //     console.log('data', data)
  //     const koders = JSON.parse(data)
  //     response.json(koders)
  //     // response.end()  Ya no es necesario porque responde.json termina la respuesta
  //     response.status(200)
  //   });
});

// GET por ID
router.get("/:id", async (request, response) => {
  const idKoder = request.params.id;
  const json = await getKoders();

  const targetKoder = json.koders.find((koder) => {
    return parseInt(koder.id) === parseInt(idKoder);
  });

  if (!targetKoder) {
    response.status(404);
    response.json({
      success: false,
      message: "Koder not found",
    });
    return;
  }

  console.log(targetKoder);
  // response.json ({koder: koderFound}) // koder es la propiedad del objeto, koderFound es el valor
  response.json(targetKoder);
});

// POST para generar un nuevo koder
router.post("/", async (request, response) => {
  const newKoder = request.body; // Recibimos la información

  const json = await getKoders();
  json.koders.push(newKoder); // Hacer push al objeto
  console.log(json);

  await fs.promises.writeFile(
    "./kodemia.json",
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

// PATCH para modificar un koder
router.patch("/:id", async (request, response) => {
  console.log("id: ", request.params.id);
  const idKoder = request.params.id;
  const name = request.body.name;

  const json = await getKoders();
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
    "./kodemia.json",
    JSON.stringify(json, null, 2),
    "utf8"
  );
  response.json({
    success: true,
  });
});

// DELETE para borrar a un koder
router.delete("/:id", async (request, response) => {
  const idKoder = request.params.id; // Pedir el id del koder

  const json = await getKoders();
  const kodersFiltered = json.koders.filter((koder) => {
    return parseInt(koder.id) !== parseInt(idKoder);
  });
  console.log(kodersFiltered);

  json.koders = kodersFiltered;

  await fs.promises.writeFile(
    "./kodemia.json",
    JSON.stringify(json, null, 2),
    "utf8"
  );
  response.json({
    success: true,
    message: "Koder deleted successfully",
  });
});

// exportar
module.exports = router;
