const { resolve } = require("path")

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: resolve(__dirname, "src", "database", "database.db")
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb) /**Habilita o DELETE CASCADE */
    },
    migrations: {
      directory: resolve(__dirname, "src", "database", "knex", "migrations")
    },
    useNullAsDefault: true
}
}