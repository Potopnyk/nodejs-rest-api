const express = require('express');
const { ValidateBody, authenticate, upload } = require('../../middlewares');
const { schemas } = require('../../middlewares/schema');

const router = express.Router();

const ctrl = require('../../controllers/auth');


router.post('/register', ValidateBody(schemas.registerSchema), ctrl.register);
router.get('/verify/:verificationToken', ctrl.verifyEmail);
router.post('/verify', ValidateBody(schemas.emailSchema), ctrl.resendVerifyEmail);
router.post('/login', ValidateBody(schemas.loginSchema), ctrl.login);
router.get('/current', authenticate, ctrl.getCurrent);
router.post('/logout', authenticate, ctrl.logout);
router.patch('/users/avatars', authenticate, upload.single('avatar'), ctrl.updateAvatar);
router.patch('/', authenticate, ValidateBody(schemas.changeSubscriptionSchema), ctrl.changeSubscription);

module.exports = router;