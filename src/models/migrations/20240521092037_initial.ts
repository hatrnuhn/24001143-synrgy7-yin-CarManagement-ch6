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

    // creates cars table
    await knex.schema.createTable('cars', table => {
        table.uuid('id', { primaryKey: true }).defaultTo(knex.fn.uuid());
        table.string('plate').notNullable();
        table.string('manufacture').notNullable();
        table.string('model').notNullable();
        table.string('rate').unsigned().notNullable();
        table.string('description').notNullable().defaultTo('This car does not have any description yet.');
        table.string('transmission').notNullable();
        table.string('type').notNullable();
        table.smallint('year').unsigned().notNullable();
        table.specificType('options', 'varchar(255)[]').nullable();
        table.specificType('specs', 'varchar(255)[]').nullable();
        table.date('available_date').notNullable().defaultTo(new Date().toISOString());
        table.timestamps(true, true);
        table.timestamp('deleted_at').nullable().defaultTo(null);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('admins');
    await knex.schema.dropTableIfExists('super_admins');
    await knex.schema.dropTableIfExists('users');
    await knex.schema.dropTableIfExists('cars');
}

