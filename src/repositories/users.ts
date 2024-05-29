import Admin from "../models/Admin";
import { UserPatch } from "../models/dtos/users";
import User from "../models/User";

class UserRepository {
    async find(userId: number) {
        return await User.query().where({ id: userId, deletedAt: null }).first();
    }

    async findAll() {
        return await User.query().where({ deletedAt: null });
    }

    async create(user: User) {
        return await User.query().insertAndFetch(user);
    }

    async patch(userId: number, update: UserPatch) {
        return await User.query()
            .patchAndFetchById(userId, update);
    }

    async delete(userId: number) {
        return await User.query()
            .findById(userId)
            .patch({ deletedAt: new Date() });
    }

    async createAdmin(userId: number) {
        return await Admin.query()
            .insertAndFetch({ userId });
    }

    async deleteAdmin(userId: number) {
        return await Admin.query()
            .delete()
            .where({ userId })
            .returning('*');
    }
}

export default new UserRepository();