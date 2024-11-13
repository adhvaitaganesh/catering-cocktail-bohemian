import express from 'express';
import { auth, adminAuth } from '../middleware/auth';
import { Booking } from '../models/Booking';

const router = express.Router();

// Create booking (public)
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).send(booking);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all bookings (admin only)
router.get('/', adminAuth, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: 1 });
    res.send(bookings);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update booking status (admin only)
router.patch('/:id', adminAuth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!booking) {
      return res.status(404).send();
    }
    res.send(booking);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router; 