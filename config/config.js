module.exports = {
  key: "tWZVu+cBrLHE2LkqTAuFdNJKgDr8w5EYcSfEbj/h2bI=*",
  port: 7000,
  salt: 10,
  docker: false,
  conectionDB: {
    user: "postgres",
    password: "secret",
    host: this.docker ? "172.20.0.20" : "localhost",
    database: "api",
    password: "secret",
    port: this.docker ? 5432 : 8009,
  },
};
