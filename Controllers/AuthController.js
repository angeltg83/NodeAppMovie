const express = require("express");
const app = express();
const bcrypt = require("bcrypt");


const jwt = require("jsonwebtoken"),
  { key } = require("../config/config");
app.set("key", key);

// PROCEDIMIENTO DE AUTENTICACION PARA APP
// una persona debe tener solo un usuario
// el usuario tiene los permisos a modulos y menu

const connection = require("../config/datastore");

getAuth = async (req, res) => {
  try {
    const db = await connection();
    // console.log("req.query -- ", req.body);
    const { username, password } = req.body;
    const user = await db.collection("user").find({ name: username }).toArray();

    // console.log("persona find ", user);

    const match = await bcrypt.compare(password, user[0].password);
    console.log("match pass ", match);
    // const { user } = persona[0];

    if (!match) {
      // res.json({ token: null, msg: "Usuario o clave no registrada" });
      //
      throw new Error({ err: "Usuario o clave no registrada" });
    } else {
      const token = jwt.sign(
        {
          check: true,
        },
        app.get("key"),
        {
          expiresIn: "24d",
        }
      );
      console.log("token -->", token);
      return res.json({
        token,
        user,
      });
    }
  } catch (err) {
    res.status(500).send({ err, token: null });
  }

  // console.log("Local");
  // res.status(200).send({ msg: "mensaje desde controlador", status: true });
};

module.exports = {
  getAuth,
};
