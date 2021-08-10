const Pool = require("pg").Pool;
const { conectionDB } = require("./config");
const pool = new Pool(conectionDB);

module.exports = {
  pool,
};
