import UserRepo from "../repositories/users";
import User from "../models/User";

class UserService {
    async getAllUsers() {
        return await UserRepo.findAll();
    }

    async getUserById(id: number) {
        return await UserRepo.find(id);
    }

    async createUser(user: User) {
        return await UserRepo.create(user);
    }

    async patchUser(id: number, update: Partial<User>) {
        return await UserRepo.patch(id, update);
    }

    async deleteUser(id: number) {
        return await UserRepo.delete(id);
    }

    async makeAdmin(userId: number) {
        return await UserRepo.createAdmin(userId);
    }

    async createAdmin(user: Partial<User>) {
        const newUser = await UserRepo.create(user);

        return await this.makeAdmin(newUser.id);
    }

    async removeAdmin(userId: number) {
        return await UserRepo.deleteAdmin(userId);
    }
}

export default new UserService();