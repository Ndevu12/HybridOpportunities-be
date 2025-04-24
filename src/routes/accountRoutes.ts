import { Router, RequestHandler } from 'express';
import AccountController from '../controllers/accountController';
import upload from '../middleware/Uploader';
import { isAdminAuth, isAuth } from '../middleware/isAuth';

const router = Router();

// Get user information
router.get('/:userId', AccountController.getUserInfo);

// Update user information
router.put('/', isAuth, upload.single('profileImage') as unknown as RequestHandler, AccountController.updateUser);
router.put('/upload-cv', isAuth, upload.single('cv') as unknown as RequestHandler, AccountController.upLoadCV);

// Delete user
router.delete('/:userId', isAdminAuth, AccountController.deleteUser);

export default router;
