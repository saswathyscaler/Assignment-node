import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

// Register new user or admin and automatically generate JWT
export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { username, password, role, adminSecret } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // If registering as admin, check the admin secret key
    if (role === 'ADMIN') {
      if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET_KEY) {
        return res.status(403).json({ msg: 'Invalid admin secret key' });
      }
    }

    // Create a new user and hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ username, password: hashedPassword, role });

    // Save the user to the database
    await user.save();

    // Generate a JWT token
    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10h' });

    // Send the token in the response along with a success message
    res.json({ msg: 'User registered successfully', token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login and get JWT token
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    let user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Create a JWT token with the user's ID and role
    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10h' });

    // Return the token
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
