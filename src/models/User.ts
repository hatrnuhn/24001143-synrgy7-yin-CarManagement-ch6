import { Model, snakeCaseMappers } from "objection";
import Admin from "./Admin";
import SuperAdmin from "./SuperAdmin";

class User extends Model {
    id!: number;
    email!: string;
    username!: string;
    password!: string;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt!: Date;
    superAdmin!: SuperAdmin;
    admin!: Admin;

    static get snakeCaseMappers() {
        return snakeCaseMappers();
    }

    static get tableName() {
        return 'users';
    }

    static get relationMappings() {
        return {
            admin: {
                relation: Model.HasOneRelation,
                modelClass: Admin,
                join: {
                    from: 'users.id',
                    to: 'admins.userId'
                }
            },
            superAdmin: {
                relation: Model.HasOneRelation,
                modelClass: SuperAdmin,
                join: {
                    from: 'users.id',
                    to: 'superAdmins.userId'
                }
            }
        }
    }
}

export default User;