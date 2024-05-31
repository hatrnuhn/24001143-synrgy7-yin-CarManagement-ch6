import { Model, snakeCaseMappers } from "objection";
import User from "./User";
import Car from "./Car";

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
            },
            createdCars: {
                relation: Model.HasManyRelation,
                modelClass: Car,
                join: {
                    from: 'admins.id',
                    to: 'cars.createdByAdmin'
                }
            },
            deletedCars: {
                relation: Model.HasManyRelation,
                modelClass: Car,
                join: {
                    from: 'admins.id',
                    to: 'cars.deletedByAdmin'
                }
            },
            updatedCars: {
                relation: Model.HasManyRelation,
                modelClass: Car,
                join: {
                    from: 'admins.id',
                    to: 'cars.lastDeletedByAdmin'
                }
            }
        }
    }
}

export default Admin;