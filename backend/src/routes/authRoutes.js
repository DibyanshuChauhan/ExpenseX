import { Router } from 'express';
import {
  register,
  login,
  forgotPassword,
  changePassword,
  getAllUsers,
  createUserByAdmin,
  deleteUserByAdmin,
} from '../controllers/authController.js';
import {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  changePasswordValidator,
  createUserValidator,
  deleteUserValidator,
} from '../validators/authValidator.js';
import { validate } from '../middlewares/validate.js';

const router = Router();

// Public auth endpoints
router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.post('/forgot-password', forgotPasswordValidator, validate, forgotPassword);
router.post('/change-password', changePasswordValidator, validate, changePassword);

// User management endpoints
router.get('/users', getAllUsers);
router.post('/users', createUserValidator, validate, createUserByAdmin);
router.delete('/users/:username', deleteUserValidator, validate, deleteUserByAdmin);

export default router;
