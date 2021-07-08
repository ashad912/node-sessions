import { Request, Response, NextFunction, Router } from "express";

export type ExpressHandler<T> = (req: Request, res: Response) => T
export type ExpressMiddleware<T>
    = ExpressHandler<T> extends (...a: any[]) => infer R ? (...a: [...U: Parameters<ExpressHandler<void>>, next: NextFunction]) => R : never

export type ExpressRouter = Router