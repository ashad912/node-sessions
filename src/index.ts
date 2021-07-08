import express from 'express'
import session from 'express-session'
import connectRedis from 'connect-redis'
import redis from 'redis'
import cors from 'cors'

import "./types_overloads/express-session"

import { connectDB } from './db/connect'
import { createSession } from './middleware/session'
import { createCorsSettings } from './middleware/cors'
import { createRoutes } from './routes'

const app = express()

const corsMiddleware = cors(createCorsSettings())

app.options('*', corsMiddleware) // for preflight requests - older browsers
app.use(corsMiddleware)
app.set('trust proxy', 1)
app.use(express.json())
// important for nginx / kubernetes usage -> being behind proxy you using http, but incoming request is https and you wondering what you're not getting cookie back

const client = connectDB(redis.createClient)

app.use(createSession({
    session,
    Store: connectRedis(session),
    client
}))

app.use(createRoutes(express.Router()))

app.listen(4000, () => console.log('server listening on port 4000'))