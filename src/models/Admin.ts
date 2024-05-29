import { Model, snakeCaseMappers } from "objection";
import User from "./User";

class Admin extends Model {
    id!: number;
    userId!: number;
    user!: User;

    static get snakeCaseMappers() {
        return snakeCaseMappers();
    }

    static get tableName() {
        return 'admins'
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'admins.userId',
                    to: 'users.id'
                }
            }
        }
    }
}

export default Admin;