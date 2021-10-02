import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import HttpException from '../exceptions/HttpErrorException';

export class AuthMiddleware {
  public isLoggedin(req: any, res: Response, next: NextFunction): any {
    const authHeader: any = req.headers.authorization;
    if (!authHeader) {
      next(new HttpException(401, 'Unauthorized', res));
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, 'secret');
    } catch (err: any) {
      err.statusCode = 500;
      throw err;
    }
    if (!decodedToken) {
      next(new HttpException(401, 'Unauthorized', res));
    }
    req.userId = decodedToken.userId;
    next();
  }
}
