const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

let repositories = [];

app.post("/repositories", (request, response, next) => {
    const {
        title,
        url,
        techs,
    } = request.body;

    const newEntry = {
        id: uuid(),
        title,
        url,
        techs,
        likes: 0,
    };

    repositories.push(newEntry);
    return response.status(200).json(newEntry);
});

app.get("/repositories", (request, response, next) => {
    return response.status(200).json(repositories);
});

app.put("/repositories/:id", (request, response, next) => {
    const { id } = request.params;

    const {
        title: newTitle,
        url: newUrl,
        techs: newTechs,
    } = request.body;

    const repoIndex = repositories.findIndex(repo => repo.id === id);

    if (repoIndex === -1) {
        return response.status(400).send('Repository not found.');
    }

    if (newTitle) repositories[repoIndex].title = newTitle;
    if (newUrl) repositories[repoIndex].url = newUrl;
    if (newTechs) repositories[repoIndex].techs = newTechs;

    return response.status(200).json(repositories[repoIndex]);
});

app.delete("/repositories/:id", (request, response, next) => {
    const { id } = request.params;

    const repoIndex = repositories.findIndex(repo => repo.id === id);

    if (repoIndex === -1) {
        return response.status(400).send('Repository not found.');
    }
    
    repositories = repositories.filter(repo => repo.id !== id);

    return response.status(204).send('Repository deleted successfully');
});

app.post("/repositories/:id/like", (request, response, next) => {
    const { id} = request.params;

    const repoIndex = repositories.findIndex(repo => repo.id === id);

    if (repoIndex === -1) {
        return response.status(400).send('Repository not found.');
    }

    repositories[repoIndex].likes = repositories[repoIndex].likes + 1;
    
    return response.status(200).json(repositories[repoIndex]);
});

module.exports = app;
