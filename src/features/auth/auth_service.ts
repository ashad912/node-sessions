import { IUserDAO } from "../user/user_dao";

export type AuthServiceResponse = { id: string }

type AuthServiceLogin = (email: string, password: string) => Promise<AuthServiceResponse>

type HashingCompareFunction = (plain: string, hash: string) => Promise<boolean>

export interface IAuthService {
    userDAO: IUserDAO
    hashCompareFunction: HashingCompareFunction;
    login: AuthServiceLogin
}

export class AuthService implements IAuthService {

    constructor(public userDAO: IUserDAO, public hashCompareFunction: HashingCompareFunction) { }

    login: AuthServiceLogin = async (email: string, password: string) => {
        try {
            const user = await this.userDAO.findUserByEmail(email)
            const match = await this.hashCompareFunction(password, user.password)

            if (!match)
                return Promise.reject('Login failed')

            return { id: user.id }
        } catch (e) {
            return Promise.reject('User not found')
        }
    }
}