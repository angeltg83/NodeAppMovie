const express = require("express");
const { port } = require("./config/config");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// const UsuarioController = require('./Controllers/UsuarioController');
app.use("/", routes);

// Para ejecutar, en la raiz del proyecto
// node index.js
// app.use(express.Router());
app.listen(port, () => {
  console.info("starting server in port : ", port);
});
