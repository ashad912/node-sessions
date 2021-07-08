import "express-session"
import { AuthServiceResponse } from "../features/auth/auth_service";

declare module "express-session" {
    interface Session {
        user: AuthServiceResponse;
    }
}