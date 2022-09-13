require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const usersHandlers = require("./usersHandlers");
const { validateMovie, validateUser } = require("./validators.js");
const { hashPassword, verifyPassword, verifyToken } = require("./auth.js");

//Routes publique

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUsersId);
app.post("/api/users", validateUser, hashPassword, usersHandlers.postUsers);
app.post(
  "/api/login",
  usersHandlers.getUsersByEmailWithPasswordAndPassToNext,
  verifyPassword
);

// Routes protégée

app.use(verifyToken);

app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", usersHandlers.deleteUsers);
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.put("/api/movies/:id", validateMovie, movieHandlers.postMovie);
app.put("/api/users/:id", validateUser, usersHandlers.putUsers);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
