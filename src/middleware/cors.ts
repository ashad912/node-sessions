import { CorsOptions } from 'cors'

export function createCorsSettings() {

    const whitelist = new Set(['https://example1.com', 'https://example2.com'])
    const corsOptions: CorsOptions = {
        origin: function (origin, callback) {
            if (!origin) return throwCallbackError()

            if (whitelist.has(origin)) {
                callback(null, true)
            } else {
                throwCallbackError()
            }

            function throwCallbackError() {
                callback(new Error('Not allowed by CORS'))

            }
        },
        credentials: true //Access-Control-Allow-Credentials header to send and/or receive cookie(s) from cross origin domains
    }

    return corsOptions
}