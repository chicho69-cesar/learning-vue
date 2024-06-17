import express from 'express'
import { admin, forgotPassword, login, register, updatePassword, user, verifyAccount, verifyPasswordResetToken } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', register)
router.get('/verify/:token', verifyAccount)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.route('/forgot-password/:token').get(verifyPasswordResetToken)
router.route('/forgot-password/:token').post(updatePassword)
router.get('/user', authMiddleware, user)
router.get('/admin', authMiddleware, admin)

export default router
