import { Model, snakeCaseMappers } from "objection";
import Admin from "./Admin";
import SuperAdmin from "./SuperAdmin";

class Car extends Model {
    id!: string;
    plate!: string;
    manufacture!: string;
    model!: string;
    rate!: string;
    description!: string;
    transmission!: string;
    type!: string;
    year!: number;
    options!: string[];
    specs!: string[];
    availableDate!: Date;
    createdAt!: Date;
    createdByAdmin!: number;
    createdBySuper!: number;
    updatedAt!: Date;
    lastUpdatedByAdmin!: number;
    lastUpdatedBySuper!: number;
    deletedAt!: Date;
    deletedByAdmin!: number;
    deletedBySuper!: number;

    static get snakeCaseMappers() {
        return snakeCaseMappers();
    }

    static get tableName() {
        return 'cars';
    }

    static get relationMappings() {
        return {
            adminCreator: {
                relation: Model.BelongsToOneRelation,
                modelClass: Admin,
                join: {
                    from: 'cars.createdByAdmin',
                    to: 'admins.id'
                }
            },
            superCreator: {
                relation: Model.BelongsToOneRelation,
                modelClass: SuperAdmin,
                join: {
                    from: 'cars.createdBySuper',
                    to: 'superAdmins.id'
                }
            },
            lastAdminUpdator: {
                relation: Model.BelongsToOneRelation,
                modelClass: Admin,
                join: {
                    from: 'cars.lastUpdatedByAdmin',
                    to: 'admins.id'
                }
            },
            lastSuperUpdator: {
                relation: Model.BelongsToOneRelation,
                modelClass: SuperAdmin,
                join: {
                    from: 'cars.lastUpdatedBySuper',
                    to: 'superAdmins.id'
                }
            },
            adminDeletor: {
                relation: Model.BelongsToOneRelation,
                modelClass: Admin,
                join: {
                    from: 'cars.deletedByAdmin',
                    to: 'admins.id'
                }
            },
            superDeletor: {
                relation: Model.BelongsToOneRelation,
                modelClass: SuperAdmin,
                join: {
                    from: 'cars.deletedBySuper',
                    to: 'superAdmins.id'
                }
            }
        }
    }
}

export default Car;