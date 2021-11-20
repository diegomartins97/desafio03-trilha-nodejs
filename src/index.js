const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return res.status(201).json(repository);
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;

  let repositoryIndex = repositories.find(repository => repository.id === id);

  if (!repositoryIndex) {
    return res.status(404).json({ error: "Repository not found" });
  }

  repositoryIndex.title = title || undefined;
  repositoryIndex.url = url || undefined;
  repositoryIndex.techs = techs || undefined;

  return res.json(repositoryIndex);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repositoryIndex = repositories.find(repository => repository.id === id);

  if (!repositoryIndex) {
    return res.status(404).json({ error: "Repository not found" });
  } else {
    repositories.splice(repositoryIndex, 1);

    return res.status(204).send();
  }
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  const repositoryIndex = repositories.find(repository => repository.id === id);

  if (!repositoryIndex) {
    return res.status(404).json({ error: "Repository not found" });
  }

  ++repositoryIndex.likes;

  return res.json(repositoryIndex);
});

module.exports = app;
