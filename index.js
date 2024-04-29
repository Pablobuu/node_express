const express = require("express");
const app = express();
const port = 3000;
const usuarios = [
  "Pablo",
  "Patricia",
  "Francisca",
  "Hector",
  "Raul",
  "Osvaldo",
  "Colomba",
];

app.get("/", (req, res) => {
  res.send("Bienvenido al server de Abracadabra!");
});

app.use(express.static("assets"));

app.get("/abracadabra/usuarios", (req, res) => {
  res.json(usuarios);
});

app.use("/abracadabra/juego/:usuario", (req, res, next) => {
  const usuario = req.params.usuario;
  const validar = usuarios
    .map((u) => u.toLowerCase())
    .includes(usuario.toLowerCase());
  if (validar) {
    next();
  } else {
    res.sendFile(__dirname + "/assets/who.jpeg");
  }
});

app.get("/abracadabra/juego/:usuario", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/abracadabra/conejo/:n", (req, res) => {
  const numero = Math.floor(Math.random() * 4) + 1;
  const n = +req.params.n;
  if (n === numero) {
    res.sendFile(__dirname + "/assets/conejito.jpg");
  } else {
    res.sendFile(__dirname + "/assets/voldemort.jpg");
  }
});

app.get("*", (req, res) => {
  res.send(
    `<center><h1>No hay mano, hermano</h1><h2>Lo que buscas no está acá</h2></center>`
  );
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
