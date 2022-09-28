import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface IPayloadJWT {
  uid: string;
  name: string;
  iat: number;
  exp: number;
}

export const validateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'doesnt exist any token',
    });
  }
  try {
    const { name, uid } = jwt.verify(
      token,
      process.env.TSC_JWT_TOKEN as string
    ) as IPayloadJWT;

    req.name = name;
    req.uid = uid;
  } catch (err) {
    return res.status(401).json({
      ok: false,
      msg: 'invalid token',
    });
  }
  next();
};
