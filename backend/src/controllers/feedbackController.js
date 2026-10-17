import { Feedback } from '../models/Feedback.js';

/**
 * Get all feedbacks (for admin)
 */
export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({}).sort({ timestamp: -1 });
    return res.status(200).json({ success: true, feedbacks });
  } catch (error) {
    console.error('Get all feedback error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching feedback' });
  }
};

/**
 * Submit new feedback
 */
export const createFeedback = async (req, res) => {
  try {
    const { username, feedback } = req.body;

    const newFeedback = await Feedback.create({
      username,
      feedback,
      timestamp: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully!',
      feedback: newFeedback,
    });
  } catch (error) {
    console.error('Create feedback error:', error);
    return res.status(500).json({ success: false, message: 'Server error submitting feedback' });
  }
};

/**
 * Delete single feedback by ID
 */
export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: 'Invalid feedback ID format!' });
    }

    const deleted = await Feedback.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Feedback not found!' });
    }

    return res.status(200).json({ success: true, message: 'Feedback deleted successfully!' });
  } catch (error) {
    console.error('Delete feedback error:', error);
    return res.status(500).json({ success: false, message: 'Server error deleting feedback' });
  }
};

/**
 * Clear all feedbacks (Admin only)
 */
export const clearAllFeedback = async (req, res) => {
  try {
    await Feedback.deleteMany({});
    return res.status(200).json({ success: true, message: 'All feedbacks deleted successfully!' });
  } catch (error) {
    console.error('Clear all feedback error:', error);
    return res.status(500).json({ success: false, message: 'Server error clearing feedback' });
  }
};
