// Importación de módulos
const express = require("express");
const fs = require("fs");

// Creación el router
const router = express.Router();

// Función para leer archivo .json y convertir de string a objeto de javascript
async function getMentors() {
  const content = await fs.promises.readFile("./kodemia.json");
  const json = JSON.parse(content);
  return json;
}

// GET mentors
router.get("/", async (request, response) => {
  const gender = request.query.gender;
  const count = request.query.count;
  const moduleKodemia = request.query.module;

  const json = await getMentors();
  let mentorsData = json.mentors;

  if (gender) {
    mentorsData = mentorsData.filter((genero) => {
      return genero.gender === gender;
    });
  }
  if (moduleKodemia) {
    mentorsData = mentorsData.filter((subject) => {
      return subject.module === moduleKodemia;
    });
  }
  if (count) {
    mentorsData = mentorsData.slice(0, parseInt(count));
  }

  response.json({
    mentors: mentorsData,
  });
});

// GET mentor for ID
router.get("/:id", async (request, response) => {
  const idMentor = request.params.id;
  const json = await getMentors();

  const mentorFound = json.mentors.find((mentorId) => {
    return parseInt(mentorId.id) === parseInt(idMentor);
  });

  response.json({
    mentor: mentorFound,
    message: "This is mentor that you search",
  });
});

// POST new mentor
router.post("/", async (request, response) => {
  // Info que enviaremos
  const newMentor = request.body;

  const json = await getMentors();
  json.mentors.push(newMentor);

  await fs.promises.writeFile(
    "./kodemia.json",
    JSON.stringify(json, null, 2),
    "utf8"
  );

  response.json({
    succes: true,
    message: "The new mentor was added successfully",
  });
});

// PATCH mentor
router.patch("/:id", async (request, response) => {
  const idMentor = request.params.id;
  const nameMentor = request.body.name;
  const moduleMentor = request.body.module;

  const json = await getMentors();

  let newMentors = json.mentors.map((mentor, index) => {
    if (parseInt(mentor.id) === parseInt(idMentor)) {
      mentor.name = nameMentor;
      mentor.module = moduleMentor;
    }
    return mentor;
  });

  json.mentors = newMentors;

  await fs.promises.writeFile(
    "./kodemia.json",
    JSON.stringify(json, null, 2),
    "utf8"
  );
  response.json({
    success: true,
    message: "The mentor is update",
  });
});

// DELETE mentor
router.delete("/:id", async (request, response) => {
  const idMentor = request.params.id;
  const json = await getMentors();

  const filterMentors = json.mentors.filter((mentorToDelete) => {
    return parseInt(mentorToDelete.id) !== parseInt(idMentor);
  });
  json.mentors = filterMentors;

  await fs.promises.writeFile(
    "./kodemia.json",
    JSON.stringify(json, null, 2),
    "utf8"
  );
  response.json({
    success: true,
    message: "The mentor was deleted successfully",
  });
});

// Exportar módulo de router
module.exports = router;
