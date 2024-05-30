import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // creates users table
    await knex.schema.createTable('users', table => {
        table.increments('id', { primaryKey: true });
        table.string('email').notNullable().unique();
        table.string('username').notNullable().unique();
        table.string('password').notNullable();
        table.timestamps(true, true);
        table.timestamp('deleted_at', { useTz: true }).nullable().defaultTo(null);
    });

    // creates admins table
    await knex.schema.createTable('admins', table => {
        table.increments('id', { primaryKey: true });
        table.integer('user_id').references('id').inTable('users').notNullable().unsigned().unique().onDelete('CASCADE');
    });

    // creates super_admins table
    await knex.schema.createTable('super_admins', table => {
        table.increments('id', { primaryKey: true });
        table.integer('user_id').references('id').inTable('users').notNullable().unsigned().unique().onDelete('CASCADE');
    });

}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('admins');
    await knex.schema.dropTableIfExists('super_admins');
    await knex.schema.dropTableIfExists('users');
}

