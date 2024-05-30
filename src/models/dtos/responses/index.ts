import { UserLoginPayload, AdminLoginPayload, SuperAdminLoginPayload } from "./login";

export type LoginPayload = UserLoginPayload | AdminLoginPayload | SuperAdminLoginPayload | null;