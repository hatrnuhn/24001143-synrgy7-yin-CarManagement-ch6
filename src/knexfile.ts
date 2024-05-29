import type { Knex } from "knex";
import { knexSnakeCaseMappers } from "objection";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: "knex_migrations",
      directory: "models/migrations"
    },
    seeds: {
      directory: 'models/seeds'
    },
    ...knexSnakeCaseMappers()
  },

  staging: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "models/migrations"
    },
    seeds: {
      directory: 'models/seeds'
    },
    ...knexSnakeCaseMappers()
  },

  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "models/migrations"
    },
    seeds: {
      directory: 'models/seeds'
    },
    ...knexSnakeCaseMappers()
  }
};

export default config;