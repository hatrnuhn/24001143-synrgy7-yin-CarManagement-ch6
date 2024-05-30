import { Knex } from "knex";
import { Model } from "objection";
import User from "../User";
import bcrypt from 'bcrypt';
import { resetRecords } from "./utils";
import SuperAdmin from "../SuperAdmin";
import Admin from "../Admin";

const generateSuperAdmins = async () => {
    const superAdminsMap: { [key: number]: Partial<User> } = {};

    Object.keys(process.env).forEach(async (key) => {
        if (/^SUPERADMIN\d{1,2}_(USERNAME|EMAIL|PASSWORD)$/i.test(key)) {
            const [index, field] = key.slice(10).split('_')
            
            const value = process.env[key];
    
            // Get or create the Super Admin object based on the index
            const superAdminIndex = parseInt(index, 10) - 1;
            if (!superAdminsMap[superAdminIndex]) {
                superAdminsMap[superAdminIndex] = { email: '', username: '', password: '' };
            }
    
            // Assign the value to the corresponding field in the Super Admin object
            if (field === 'EMAIL') {
                superAdminsMap[superAdminIndex].email = value;
            } else if (field === 'USERNAME') {
                superAdminsMap[superAdminIndex].username = value;
            } else if (field === 'PASSWORD' && value) {
                superAdminsMap[superAdminIndex].password = await bcrypt.hash(value, 10);
            }

        }
    });
    
    return Object.values(superAdminsMap);
}

const generateAdmins = async (n: number) => {
    const admins: Partial<User>[] = [];

    for (let i = 0; i < n; i++) {
        const adminString = `admin${i + 1}`
        admins.push({
            email: adminString + '@ch6.com',
            username: adminString,
            password: await bcrypt.hash(adminString, 10)
        })
    }

    return admins;
}

const generateUsers = async (n: number) => {
    const users: Partial<User>[] = [];

    for (let i = 0; i < n; i++) {
        const userString = `user${i + 1}`
        users.push({
            email: userString + '@ch6.com',
            username: userString,
            password: await bcrypt.hash(userString, 10)
        })
    }

    return users;
}

export async function seed(knex: Knex): Promise<void> {
    // Bind the knex instance to Objection
    Model.knex(knex);

    let superAdmins = await generateSuperAdmins();
    let admins = await generateAdmins(9);
    const users = await generateUsers(17);

    if(!superAdmins.length) throw new Error('Please input at least one super admin identity in the environment variables');

    await resetRecords(knex, 'admins', 'id');
    await resetRecords(knex, 'super_admins', 'id');
    await resetRecords(knex, 'users', 'id');

    console.log(await User.query().insertAndFetch(users));

    const savedSuperAdmins = await User.query().insertAndFetch(superAdmins);
    console.log(await SuperAdmin.query().insert(savedSuperAdmins.map((s, i): Partial<SuperAdmin> => {
        return {
            userId: s.id
        }
    })));

    const savedAdmins = await User.query().insertAndFetch(admins);
    console.log(await Admin.query().insert(savedAdmins.map((a, i): Partial<Admin> => {
        return {
            userId: a.id
        }
    })));
};
