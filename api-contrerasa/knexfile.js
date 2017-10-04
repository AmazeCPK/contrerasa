// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {filename: './contrerasa.sqlite3'},
    debug: false,
    useNullAsDefault: true
  },

  staging: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user:     'postgres',
      database: 'contrerasa',
      password: "istony09"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {tableName: 'knex_migrations'},
    seeds: { directory: "./seeds" },
    debug: false
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
