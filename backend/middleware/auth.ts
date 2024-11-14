import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Customer } from '../models/Customer';

interface JwtPayload {
  customerId: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      customer?: JwtPayload;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as JwtPayload;
    req.customer = decoded;
    
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

export const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as JwtPayload;
    
    if (decoded.role !== 'admin') {
      throw new Error();
    }

    req.customer = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Admin access required.' });
  }
};