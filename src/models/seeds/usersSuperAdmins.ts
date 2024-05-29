import { Knex } from "knex";
import { Model } from "objection";
import User from "../User";
import bcrypt from 'bcrypt';
import { resetRecords } from "./utils";
import SuperAdmin from "../SuperAdmin";
import Admin from "../Admin";

export async function seed(knex: Knex): Promise<void> {
    // Bind the knex instance to Objection
    Model.knex(knex);

    await resetRecords(knex, 'super_admins', 'id');
    await resetRecords(knex, 'admins', 'id');
    await resetRecords(knex, 'users', 'id');

    const superEmail = process.env.SUPERADMIN_EMAIL;
    const superUsername = process.env.SUPERADMIN_USERNAME;
    const superPassword = process.env.SUPERADMIN_PASSWORD;

    if (!superEmail || !superUsername || !superPassword) {
        throw new Error('Please provide superadmin identities in Environment variables');
    }

    const users = [
        {
            email: superEmail,
            username: superUsername,
            password: await bcrypt.hash(superPassword, 10)
        },
        {
            email: 'admin1@ch6.com',
            username: 'admin1',
            password: await bcrypt.hash('admin1', 10)
        },
        {
            email: 'user1@xyz.com',
            username: 'user1',
            password: await bcrypt.hash('user1', 10)
        },
        {
            email: 'user2@abc.com',
            username: 'user2',
            password: await bcrypt.hash('user2', 10)
        },
        {
            email: 'user3@ijk.com',
            username: 'user3',
            password: await bcrypt.hash('user3', 10)
        }
    ];

    await User.query().insert(users);
    await SuperAdmin.query().insert({ userId: 1 });
    await Admin.query().insert({ userId: 2 });
};
