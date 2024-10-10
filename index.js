import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';

// Load environment variables
dotenv.config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.initMiddleware();
    this.initRoutes();
    this.connectDatabase();
  }

  // Initialize Middleware
  initMiddleware() {
    this.app.use(express.json()); // For parsing JSON bodies
    this.app.use(cors()); // Allow cross-origin requests
  }

  // Initialize Routes
  initRoutes() {
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api', assignmentRoutes);
  }

  // Connect to MongoDB
  connectDatabase() {
    connectDB();
  }

  // Start the server
  start() {
    this.app.listen(this.port, () =>
      console.log(`Server running on port ${this.port}`)
    );
  }
}

// Create a new server instance and start it
const server = new Server();
server.start();
