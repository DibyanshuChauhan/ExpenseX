import { Router } from 'express';
import {
  getAllFeedback,
  createFeedback,
  deleteFeedback,
  clearAllFeedback,
} from '../controllers/feedbackController.js';
import {
  createFeedbackValidator,
  deleteFeedbackValidator,
} from '../validators/feedbackValidator.js';
import { validate } from '../middlewares/validate.js';

const router = Router();

router.get('/', getAllFeedback);
router.post('/', createFeedbackValidator, validate, createFeedback);
router.delete('/all', clearAllFeedback);
router.delete('/:id', deleteFeedbackValidator, validate, deleteFeedback);

export default router;
