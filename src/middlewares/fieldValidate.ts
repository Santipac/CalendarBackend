import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

interface CustomMiddleware {
  (req: Request, res: Response, next: NextFunction): void;
}

const fieldValidate: CustomMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  next();
};

export default fieldValidate;
