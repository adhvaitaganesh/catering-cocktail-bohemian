import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Customer } from '../models/Customer';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    
    const token = jwt.sign(
      { customerId: customer._id, role: customer.role },
      process.env.JWT_SECRET || 'your-secret-key'
    );
    
    res.status(201).send({ customer, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findOne({ email: req.body.email });
    if (!customer) {
      throw new Error('Invalid login credentials');
    }

    const isMatch = await bcrypt.compare(req.body.password, customer.password);
    if (!isMatch) {
      throw new Error('Invalid login credentials');
    }

    const token = jwt.sign(
      { customerId: customer._id, role: customer.role },
      process.env.JWT_SECRET || 'your-secret-key'
    );

    res.send({ customer, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router; 