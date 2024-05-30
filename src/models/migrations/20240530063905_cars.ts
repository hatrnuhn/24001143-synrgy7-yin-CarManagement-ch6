import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
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
        table.integer('deleted_by_admin').references('id').inTable('admins').unsigned().onDelete('CASCADE').defaultTo(null);
        table.integer('deleted_by_super').references('id').inTable('super_admins').unsigned().onDelete('CASCADE').defaultTo(null);
        table.check(`
            (deleted_at IS NULL AND deleted_by_admin IS NULL AND deleted_by_super IS NULL)
            OR 
            (deleted_at IS NOT NULL AND (deleted_by_admin IS NOT NULL OR deleted_by_super IS NOT NULL) AND (deleted_by_admin IS NULL OR deleted_by_super IS NULL))
        `);
        table.integer('created_by_admin').unsigned().references('id').inTable('admins').onDelete('CASCADE');
        table.integer('created_by_super').unsigned().references('id').inTable('super_admins').onDelete('CASCADE');
        table.check('created_by_admin IS NOT NULL OR created_by_super IS NOT NULL');
        table.check('created_by_admin IS NULL OR created_by_super IS NULL');
        table.integer('last_updated_by_admin').references('id').inTable('admins').unsigned().onDelete('CASCADE');
        table.integer('last_updated_by_super').references('id').inTable('super_admins').unsigned().onDelete('CASCADE');
        table.check('last_updated_by_admin IS NOT NULL OR last_updated_by_super IS NOT NULL');
        table.check('last_updated_by_admin IS NULL OR last_updated_by_super IS NULL');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('cars');
}

