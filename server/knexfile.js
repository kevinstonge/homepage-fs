require('dotenv').config();
module.exports = {
  development: {
    client: "sqlite3",
    connection: { filename: "./data/ks.db3" },
    migrations: { directory: "./data/migrations" },
    seeds: { directory: "./data/seeds" },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, cb) => {
        conn.run("PRAGMA foreign_keys = ON", cb);
      },
    },
  },
  testing: {
    client: "sqlite3",
    connection: { filename: "./data/ks.test.db3" },
    migrations: { directory: "./data/migrations" },
    seeds: { directory: "./data/seeds" },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, cb) => {
        conn.run("PRAGMA foreign_keys = ON", cb);
      },
    },
  },
  production: {
    client: "pg",
    connection: {
      host: process.env.DATABASE_IP,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_DATABASE,
    },
    ssl: { rejectUnauthorized: false },
    migrations: { directory: "./data/migrations" },
    seeds: { directory: "./data/seeds" },
    pool: {
      afterCreate: (conn, cb) => {
        conn.run("PRAGMA foreign_keys = ON", cb);
      },
    },
  },
};
