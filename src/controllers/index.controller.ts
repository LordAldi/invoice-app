import { RequestWithUser } from '@/interfaces/auth.interface';
import { NextFunction, Request, Response } from 'express';

class IndexController {
  public index = (req: RequestWithUser, res: Response, next: NextFunction): void => {
    try {
      res.send(req.user);
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
