import { ExpressHandler } from '../../interfaces/express_types'
import { IAuthService } from '../auth/auth_service'

interface ILoginController {
    authService: IAuthService
}

interface LoginProps {
    email: string;
    password: string;
}

export class LoginController implements ILoginController {

    constructor(public authService: IAuthService) { }

    handleLogin: ExpressHandler<void> = async (req, res) => {
        const { email, password } = req.body as LoginProps;

        //use validation library like joy
        if (!email || !password) {
            return res.status(400).json('Login failed')
        }

        try {
            const user = await this.authService.login(email, password)
            req.session.user = user
            res.sendStatus(204)
        } catch (err) {
            // console is synchronous - use logger library like winston
            console.error(err)
            res.status(401).json(err)
        }
    }
}
