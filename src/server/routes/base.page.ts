import { NextFunction, Request, Response } from 'express'
import path from 'path'


export const baseRoute = function baseRoute (req: Request, res: Response, next: NextFunction) {
  res.sendFile(path.resolve(__dirname, '../../../index.html'))
}

export default baseRoute
