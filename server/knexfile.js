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
    connection: `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@${process.env.DATABASE_IP}:5432/portfolio`,
    ssl: { rejectUnauthorized: false },
    migrations: { directory: "./data/migrations" },
    seeds: { directory: "./data/seeds" },
  },
};
