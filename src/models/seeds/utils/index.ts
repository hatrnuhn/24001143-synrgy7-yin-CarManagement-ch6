import { Knex } from "knex";
import User from "../../User";

export const resetRecords = async (knex: Knex, table: string, serialColumn: string) => {
    try {
        // Start a transaction
        await knex.transaction(async trx => {
            // Delete all existing entries
            await User.query(trx).delete();

            // Reset the auto-increment counter
            const sequenceNameQuery = await trx.raw(`SELECT pg_get_serial_sequence('${table}', '${serialColumn}')`);
            const sequenceName = sequenceNameQuery.rows[0].pg_get_serial_sequence;
            await trx.raw(`ALTER SEQUENCE ${sequenceName} RESTART WITH 1`);

            console.log('All records deleted, auto-increment counter reset, and superadmin checked');
        });   
    } catch (err) {
        throw new Error(`Error in resetRecords function: ${err}`);
    }
};
