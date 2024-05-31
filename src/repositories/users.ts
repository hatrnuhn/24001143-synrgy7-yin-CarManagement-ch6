import Admin from "../models/Admin";
import User from "../models/User";

class UserRepository {
    async find(userId: number) {
        return await User.query().where({ id: userId, deletedAt: null }).first();
    }

    async findAll() {
        return await User.query().where({ deletedAt: null });
    }

    async create(user: Partial<User>) {
        return await User.query().insertAndFetch(user);
    }

    async patch(userId: number, update: Partial<User>) {
        return await User.query()
            .patchAndFetchById(userId, update);
    }

    async delete(userId: number) {
        return await User.query()
            .findById(userId)
            .patch({ deletedAt: new Date() });
    }

    async createAdmin(userId: number) {
        const user = User.query()
            .findById(userId);

        if(!user) return undefined;
        
        return await Admin.query()
            .insertAndFetch({ userId })
            .withGraphFetched('user');
    }

    async deleteAdmin(adminId: number) {
        return await Admin.query()
            .delete()
            .findOne({ id: adminId })
            .returning('*');
    }
}

export default new UserRepository();