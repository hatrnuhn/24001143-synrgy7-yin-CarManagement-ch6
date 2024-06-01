import Admin from "../models/Admin";
import User from "../models/User";
import { UserResponse } from "../models/dtos/responses/users";

const toUserResponseOrUndefined = (u: User | undefined): UserResponse | undefined => {
    if (!u) return undefined;
    return {
        id: u.id,
        email: u.email,
        username: u.username,
        createdAt: u.createdAt,
        updatedAt: u.updatedAt
    }
}

class UserRepository {
    async find(userId: number) {
        const user = await User.query().where({ id: userId, deletedAt: null }).first();

        return toUserResponseOrUndefined(user);
    }

    async findAll() {
        const users = await User.query().where({ deletedAt: null });

        return users.map((u, i) => {
            return toUserResponseOrUndefined(u) as UserResponse;
        })
    }

    async create(user: Partial<User>) {
        const savedUser = await User.query().insertAndFetch(user);

        return toUserResponseOrUndefined(savedUser);
    }

    async patch(userId: number, update: Partial<User>) {
        const patchedUser = await User.query()
            .patch(update)
            .where({ id: userId, deletedAt: null })
            .returning('*')
            .first();

        return toUserResponseOrUndefined(patchedUser);
    }

    async delete(userId: number) {
        const deletedUser = await User.query()
            .patch({ deletedAt: new Date() })
            .where({ id: userId, deletedAt: null })
            .returning('*')
            .first();

        return toUserResponseOrUndefined(deletedUser);
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