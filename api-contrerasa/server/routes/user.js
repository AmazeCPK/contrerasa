import express from'express';
import UserController from './../controllers/User-Controller';

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);

router.patch('/:id', UserController.updateUser);
router.patch('/:id/role', UserController.updateRole);

export default router;