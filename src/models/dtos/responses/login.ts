export interface UserLoginPayload {
    userId: number;
    email: string;
    username: string;
}

export interface AdminLoginPayload extends UserLoginPayload{
    adminId: number;
}

export interface SuperAdminLoginPayload extends UserLoginPayload {
    superId: number;
}
  