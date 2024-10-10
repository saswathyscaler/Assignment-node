import express from 'express';
import { register, login } from '../controllers/authController.js';
import { body } from 'express-validator';

const router = express.Router();

// Register route with validation
router.post('/register', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['USER', 'ADMIN']).withMessage('Invalid role'),
  // The adminSecret is only needed if registering as ADMIN
  body('adminSecret').optional().isString().withMessage('Admin secret must be a string')
], register);

// Login route
router.post('/login', login);

export default router;
