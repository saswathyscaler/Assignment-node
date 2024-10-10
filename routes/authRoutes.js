import express from 'express';
import { register, login } from '../controllers/authController.js';
import { body } from 'express-validator';

const router = express.Router();

// Register route
router.post('/register', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], register);

// Login route
router.post('/login', login);

export default router;
