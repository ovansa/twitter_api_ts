import { Request, Response } from 'express';

export const healthCheck = (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Good to go!' });
};
