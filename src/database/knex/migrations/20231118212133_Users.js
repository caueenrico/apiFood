const knex = require("knex");

exports.up = async (knex) =>
  await knex.schema.hasTable("users").then(function (exists) {
    if (!exists) {
      return knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("name");
        table.string("email");
        table.string("password");

        table
        .enum("role", ["admin","client","employee"], {useNative: true, enumName: "roles"})
        .notNullable().default("client")

        table.string("avatar").nullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      });
    }
  });

exports.down = (knex) => knex.schema.dropTable("users");
