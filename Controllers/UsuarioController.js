/**
 * @description metodo que consulta a la base de datos en mysql y devuelve un listado de los actores
 * @author Angel Tigua
 * @since 2020.NOV.01
 */

listadoActores = async (req, res) => {
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
  
};

/**
 * @description metodo que guarda en base mysql nuevo registro en tabla pelicula
 * @author Angel Tigua
 * @param req.body {json}
 * @since 2020.NOV.01
 */
setRegister = async (req, res) => {
  try {
    const connection = require("../config/datastore");
    const query = require("../config/query");
  
    const { form } = req.body;
    form.actor = JSON.stringify(form.actor);
  
    const insert_into = `INSERT INTO pelicula(nombre,sinopsis,duracion,genero,actor) VALUES('${form.nombre}','${form.sinopsis}',${form.duracion},'${form.genero}','${form.actor}');`;
    console.log("insert into : ", insert_into);
  
    // const conn =
    const data = await query(
      await connection().catch((e) => {}),
      insert_into
    ).catch(console.log);
    res.json({ data });  
  } catch (err) {
    return res.status(500).send({ err });
  }
  
};

/**
 * @description metodo que consulta en base mysql listado de peliculas
 * @author Angel Tigua
 * @pending mejora en query para aceptar criterios de busuqeda y paginación
 * @since 2020.NOV.01
 */

getPeliculasListado = async (req, res) => {
  try {
    const connection = require("../config/datastore");
    const query = require("../config/query");

    const data = await query(
      await connection().catch((e) => {}),
      "SELECT * FROM pelicula"
    ).catch(console.log);
    res.json({ data });
  } catch (err) {
    console.log(err);
    // return new Error("Error : ", err);
    return res.status(500).send({ err });

  }
};

/**
 * @description metodo que actualiza un registro en la tabla pelicula
 * @author Angel Tigua
 * @param req.body {json}
 * @since 2020.NOV.01
 */
setActualizaPelicula = async (req, res) => {
  try {
    const connection = require("../config/datastore");
    const query = require("../config/query");
  
    const { form } = req.body;
    form.actor = JSON.stringify(form.actor);
    // ,'${form.sinopsis}',${form.duracion},'${form.genero}','${form.actor}')

    const updateAll = `UPDATE pelicula(nombre,sinopsis,duracion,genero,actor) WHERE id = '${form.id}';`;
    
    console.log("insert into : ", updateAll);
  
    // const conn =
    const data = await query(
      await connection().catch((e) => {}),
      updateAll
    ).catch(console.log);
    res.json({ data });  
  } catch (err) {
    return res.status(500).send({ err });
  }
  
};
module.exports = {
  setRegister,
  listadoActores, // setRegister,
  getPeliculasListado,
  setActualizaPelicula,
  // get,
};
