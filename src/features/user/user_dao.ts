
export interface IUser {
    id: string;
    email: string;
    password: string;
}

export interface IUserDAO {
    users: IUser[];
    findUserByEmail(email: string): Promise<IUser>
}

type HashingSyncFunction = (password: string, iterations: number) => string

// Simulate interaction with db
export class UserDAO implements IUserDAO {

    users: IUser[]

    constructor(hashingSyncFunction: HashingSyncFunction) {
        this.users = [
            {
                id: 'user1',
                email: "user1@test.com",
                password: hashingSyncFunction('user1pwd', 10)

            },
            {
                id: 'user1',
                email: "user1@test.com",
                password: hashingSyncFunction('user2pwd', 10)
            }
        ]
    }

    async findUserByEmail(email: string) {
        const user = this.users.find((user) => user.email === email)
        return user || Promise.reject('Email not found')
    }
}