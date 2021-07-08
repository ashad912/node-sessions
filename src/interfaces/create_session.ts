import { RequestHandler } from 'express'
import { RedisStore } from 'connect-redis'
import { RedisClient } from 'redis'
import { SessionOptions } from 'express-session'

export interface ICreateSession {
    session(options?: SessionOptions | undefined): RequestHandler;
    Store: RedisStore;
    client: RedisClient
}