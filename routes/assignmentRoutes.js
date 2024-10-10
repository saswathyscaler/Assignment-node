import express from 'express';
import { uploadAssignment, getAssignmentsForAdmin, acceptAssignment, rejectAssignment } from '../controllers/assignmentController.js';
import { authenticateJWT, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

// User upload assignment
router.post('/upload', authenticateJWT, authorizeRoles('USER', 'ADMIN'), uploadAssignment);

// Admin gets assignments
router.get('/assignments', authenticateJWT, authorizeRoles('ADMIN'), getAssignmentsForAdmin);

// Admin accepts assignment
router.post('/assignments/:id/accept', authenticateJWT, authorizeRoles('ADMIN'), acceptAssignment);

// Admin rejects assignment
router.post('/assignments/:id/reject', authenticateJWT, authorizeRoles('ADMIN'), rejectAssignment);

export default router;
