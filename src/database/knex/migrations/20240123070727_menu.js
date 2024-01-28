exports.up = (knex) =>
  knex.schema.createTable("menu", (table) => {
    table.increments("id");
    table.integer("user_id").references("id").inTable("users");

    table.string("picture").nullable();
    table.text("title");
cd
    table
      .enum("category", ["salada", "refeicao","lanche","suco", "bebida","bebida alcoolica","sobremesa"], {
        useNative: true,
        enumName: "category",
      })
      .notNullable()
      .default("refeicao");
    
    table.text("price");
    table.text("description");

    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
  });

  exports.down = (knex) => knex.schema.dropTable("menu");
