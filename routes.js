const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("./config/config");
var cors = require("cors");

const app = express();

app.set("key", config.key);
app.options("*", cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const UsuarioController = require("./Controllers/UsuarioController");
// const AuthController = require("./Controllers/AuthController");/

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use(express.Router());

const rutasProtegidas = express.Router();
rutasProtegidas.use((req, res, next) => {
  const token = req.headers["access-token"];
  console.log("TOKEN ", token);
  if (token) {
    jwt.verify(token, app.get("key"), (err, decoded) => {
      if (err) {
        return res.json({ mensaje: "Token inválida" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      mensaje: "Token no proveída.",
    });
  }
});

// app.get("/prueba", rutasProtegidas, UsuarioController.prueba);
// app.get("/get", rutasProtegidas, UsuarioController.get);
// app.post("/auth", AuthController.getAuth);
app.post("/setRegister", UsuarioController.setRegister);
app.post("/getPeliculasListado", UsuarioController.getPeliculasListado);
app.post("/actores", UsuarioController.listadoActores);
app.post("/generos", UsuarioController.listadoGeneros);
app.post("/getPelicula", UsuarioController.getPelicula);
app.post("/editarPelicula", UsuarioController.editarPelicula);






module.exports = app;
