import { ICreateSession } from "../interfaces/create_session"

export function createSession(dependecies: ICreateSession) {
    const { session, Store, client } = dependecies
    return session({
        store: new Store({ client }),
        secret: 'halko',
        saveUninitialized: false,
        name: 'sessionId',
        resave: false,
        cookie: {
            secure: false, // if true: only transmit cookie over https
            httpOnly: true, // if true: prevents client JS from reading the cookie
            maxAge: 30 * 60 * 1000 // in msc
        }
    })
}