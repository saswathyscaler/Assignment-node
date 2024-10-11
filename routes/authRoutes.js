import express from 'express';
import { register, login, getAllAdminUsernames } from '../controllers/authController.js';
import { body } from 'express-validator';
import { authenticateJWT, authorizeRoles } from '../middlewares/authMiddleware.js';

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
// Route to fetch all admin usernames
router.get('/admins', authenticateJWT, authorizeRoles('USER', 'ADMIN'), getAllAdminUsernames);


export default router;
