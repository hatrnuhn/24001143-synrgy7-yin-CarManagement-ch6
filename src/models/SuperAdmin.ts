import { Model, snakeCaseMappers } from "objection";
import User from "./User";
import Car from "./Car";

class SuperAdmin extends Model {
    id!: number;
    userId!: number;
    user!: User;

    static get snakeCaseMappers() {
        return snakeCaseMappers();
    }

    static get tableName() {
        return 'superAdmins'
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'superAdmins.userId',
                    to: 'users.id'
                }
            },
            createdCars: {
                relation: Model.HasManyRelation,
                modelClass: Car,
                join: {
                    from: 'superAdmins.id',
                    to: 'cars.createdBySuper'
                }
            },
            deletedCars: {
                relation: Model.HasManyRelation,
                modelClass: Car,
                join: {
                    from: 'superAdmins.id',
                    to: 'cars.deletedBySuper'
                }
            },
            updatedCars: {
                relation: Model.HasManyRelation,
                modelClass: Car,
                join: {
                    from: 'superAdmins.id',
                    to: 'cars.lastDeletedBySuper'
                }
            }

        }
    }
}

export default SuperAdmin;