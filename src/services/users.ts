import UserRepo from "../repositories/users";
import { UserPatch } from "../models/dtos/users";
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

    async patchUser(id: number, update: UserPatch) {
        return await UserRepo.patch(id, update);
    }

    async deleteUser(id: number) {
        return await UserRepo.delete(id);
    }

    async makeAdmin(userId: number) {
        return await UserRepo.createAdmin(userId);
    }

    async removeAdmin(userId: number) {
        await UserRepo.deleteAdmin(userId);
    }
}

export default new UserService();