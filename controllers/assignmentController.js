import Assignment from '../models/Assignment.js';

// Create assignment
export const uploadAssignment = async (req, res) => {
  const { task, adminId } = req.body;

  try {
    const assignment = new Assignment({ userId: req.user.userId, task, adminId });
    await assignment.save();
    res.json(assignment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get assignments for admin
export const getAssignmentsForAdmin = async (req, res) => {
  try {
    const assignments = await Assignment.find({ adminId: req.user.userId });
    res.json(assignments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Accept assignment
export const acceptAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment || assignment.adminId.toString() !== req.user.userId)
      return res.status(403).json({ msg: 'Not authorized' });

    assignment.status = 'ACCEPTED';
    await assignment.save();
    res.json(assignment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Reject assignment
export const rejectAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment || assignment.adminId.toString() !== req.user.userId)
      return res.status(403).json({ msg: 'Not authorized' });

    assignment.status = 'REJECTED';
    await assignment.save();
    res.json(assignment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
