import bcrypt from 'bcrypt'

import { ExpressRouter } from "../interfaces/express_types"
import { authMiddleware } from '../middleware/auth'

import { LoginController } from '../features/login/login_controller'
import { ProfileController } from '../features/profile/profile_controller'

import { UserDAO } from '../features/user/user_dao'
import { AuthService, IAuthService } from '../features/auth/auth_service'


export function createRoutes(router: ExpressRouter) {

    const userDao = new UserDAO(bcrypt.hashSync)
    const authService = new AuthService(userDao, bcrypt.compare)

    router.post('/login', new LoginController(authService).handleLogin)
    router.get('/profile', authMiddleware, new ProfileController().handleProfile)

    return router
}
