const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.post("/repositories", (request, response) => {
  const { title, techs, likes } = request.body;

  const repository = { id: uuid(), title, techs, likes };

  repositories.push(repository);
  return response.json(repository);
});

app.get("/repositories", (request, response) => {
  // TODO
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title,techs,likes} = request.body;

  const respositorieIndex = respositories.findIndex(respositorie => repositorie.id === id);
  if (respositorieIndex < 0) {
    return response.status(400).json({ error: "Repositorie not found" });
  }
  const repositorie = {
    id,
    title,
    techs,
    likes,
  }
  repositories[repositorieIndex] = respositorie;
  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
