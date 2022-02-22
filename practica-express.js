// Importar módulo de express y router
const express = require("express");
const kodersRouter = require("./routers/koders");
const mentorsRouter = require("./routers/mentors");

// Creación del servidor
const server = express();

// Recibir json en nuestros request
server.use(express.json()); // Convierte el json a un objeto en javascript

// Montar el router de koders y mentors
server.use("/koders", kodersRouter);
server.use("/mentors", mentorsRouter);

// Puerto
server.listen(8080, () => {
  console.log("Server running on port: 8080");
});
