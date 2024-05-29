import Objection from "objection";
import User from "../User";

export interface UserPatch extends Objection.PartialModelObject<User> {
    id?: number;
    email?: string;
    username?: string;
    password?: string;
    deletedAt?: Date;
}