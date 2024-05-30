import { Model, snakeCaseMappers } from "objection";
import Admin from "./Admin";


export class Car extends Model {
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
            createdByAdmin: {
                relation: Model.BelongsToOneRelation,
                modelClass: Admin,
                join: {
                    from: 'cars.createdBy',
                    to: 'admins.id'
                }
            },
            createdBySuper: {
                relation: Model.BelongsToOneRelation,
                modelClass: Admin,
                join: {
                    from: 'cars.createdBy',
                    to: 'superAdmins.id'
                }
            },
            lastUpdatedByAdmin: {
                relation: Model.BelongsToOneRelation,
                modelClass: Admin,
                join: {
                    from: 'cars.lastUpdatedBy',
                    to: 'admins.id'
                }
            },
            lastUpdatedBySuper: {
                relation: Model.BelongsToOneRelation,
                modelClass: Admin,
                join: {
                    from: 'cars.lastUpdatedBy',
                    to: 'superAdmins.id'
                }
            },
            deletedByAdmin: {
                relation: Model.BelongsToOneRelation,
                modelClass: Admin,
                join: {
                    from: 'cars.deletedBy',
                    to: 'admins.id'
                }
            },
            deletedBySuper: {
                relation: Model.BelongsToOneRelation,
                modelClass: Admin,
                join: {
                    from: 'cars.deletedBy',
                    to: 'superAdmins.id'
                }
            }
        }
    }
}