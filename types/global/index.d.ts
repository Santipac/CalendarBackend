import { Request, Response } from 'express';

export interface ApiFunction {
  (req: Request, res: Response): void;
}
