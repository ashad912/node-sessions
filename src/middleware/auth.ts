import { ResponseError } from '../errors/ResponseError'
import { ExpressMiddleware } from '../interfaces/express_types'

export const authMiddleware: ExpressMiddleware<void> = (req, res, next) => {
    if (!req.session || !req.session.user)
        return res.json(new ResponseError('You shall not pass', 401))
    next()
}