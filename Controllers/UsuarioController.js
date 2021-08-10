/**
 * @description metodo que consulta a la base de datos en mysql y devuelve un listado de los actores
 * @author Angel Tigua
 * @since 2020.NOV.01
 */

(listadoActores = async (req, res) => {
  try {
    const connection = require("../config/datastore");
    const query = require("../config/query");

    // const conn =
    const data = await query(
      await connection().catch((e) => {}),
      "SELECT * FROM actor"
    ).catch(console.log);
    res.json({ data });
  } catch (err) {
    return res.status(500).send({ err });
  }
}),
  /**
   * @description metodo que guarda en base mysql nuevo registro en tabla pelicula
   * @author Angel Tigua
   * @param req.body {json}
   * @since 2020.NOV.01
   */
  (setRegister = async (req, res) => {
    try {
      const connection = require("../config/datastore");
      const query = require("../config/query");

      const { form } = req.body;
      form.actores = JSON.stringify(form.actores);
      form.genero = JSON.stringify(form.genero); // nuevo campo es {}

      const insert_into = `INSERT INTO pelicula(nombre,sinopsis,duracion,genero,actores) VALUES('${form.nombre}','${form.sinopsis}',${form.duracion},'${form.genero}','${form.actores}');`;
      console.log("insert into : ", insert_into);

      // const conn =
      const data = await query(
        await connection().catch((e) => {}),
        insert_into
      ).catch(console.log);
      res.json({ status: true, data });
    } catch (err) {
      return res.status(500).send({ err });
    }
  }),
  /**
   * @description metodo que consulta en base mysql listado de peliculas
   * @author Angel Tigua
   * @pending mejora en query para aceptar criterios de busuqeda y paginación
   * @since 2020.NOV.01
   */

  (getPeliculasListado = async (req, res) => {
    try {
      const connection = require("../config/datastore");
      const query = require("../config/query");

      const data = await query(
        await connection().catch((e) => {}),
        "SELECT p.id,p.nombre,p.duracion,p.sinopsis,CAST(JSON_UNQUOTE (JSON_EXTRACT(p.genero,'$[0].name')) as char) as genero FROM pelicula p"
      ).catch(console.log);
      // console.log(data);
      res.json({ data });
    } catch (err) {
      console.log(err);
      // return new Error("Error : ", err);
      return res.status(500).send({ err });
    }
  }),
  (getPelicula = async (req, res) => {
    try {
      const { id } = req.body;
      console.error("id ", id);
      const connection = require("../config/datastore");
      const query = require("../config/query");

      // const conn =
      const data = await query(
        await connection().catch((e) => {}),
        "SELECT * FROM pelicula WHERE id=" + id
      ).catch(console.log);
      res.json({ data });
    } catch (err) {
      return res.status(500).send({ err });
    }
  }),
  /**
   * @description metodo que consulta a la base de datos en mysql y devuelve un listado de los actores
   * @author Angel Tigua
   * @since 2020.NOV.01
   */

  (listadoGeneros = async (req, res) => {
    try {
      const connection = require("../config/datastore");
      const query = require("../config/query");

      // const conn =
      const data = await query(
        await connection().catch((e) => {}),
        "SELECT * FROM genero"
      ).catch(console.log);
      res.json({ data });
    } catch (err) {
      return res.status(500).send({ err });
    }
  }),
  /**
   * @description metodo que consulta a la base de datos en mysql y devuelve un listado de los actores
   * @author Angel Tigua
   * @since 2020.NOV.06
   */

  (editarPelicula = async (req, res) => {
    try {
      const connection = require("../config/datastore");
      const query = require("../config/query");

      const { form } = req.body;
      console.log("form update ", form);
      form.actores = JSON.stringify(form.actores);
      form.genero = JSON.stringify(form.genero); // nuevo campo es {}

      const queryUpdate = `UPDATE pelicula SET nombre='${form.nombre}', duracion='${form.duracion}', sinopsis='${form.sinopsis}', genero='${form.genero}', actores='${form.actores}'
                     WHERE id=${form.id}`;

      console.log("queryUpdate ", queryUpdate);
      const data = await query(
        await connection().catch((e) => {}),
        queryUpdate
      ).catch(console.log);
      res.json({ data });
    } catch (err) {
      return res.status(500).send({ err });
    }
  }),
  (getUser = async (req, res) => {
    const { pool } = require("../config/query");
    pool.query("SELECT * FROM dbo.usuario", (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).json(result.rows);
    });
  });
module.exports = {
  getUser,
  
  listadoActores,
  setRegister,
  getPeliculasListado,
  // setActualizaPelicula,
  getPelicula,
  listadoGeneros,
  editarPelicula,
};
