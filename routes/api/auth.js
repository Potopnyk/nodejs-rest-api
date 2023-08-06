const express = require('express');
const { validateBody, authenticate, upload } = require('../../middlewares');
const { schemas } = require('../../middlewares/schema');

const router = express.Router();

const ctrl = require('../../controllers/auth');
const { ctrlWrapper } = require('../../helpers');

router.post(
    '/register',
    validateBody(schemas.registerSchema),
    ctrlWrapper(ctrl.register), 
);

router.post('/login', validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));

router.post('/logout', authenticate, ctrlWrapper(ctrl.logout));

router.patch(
    '/users/avatars',
    authenticate,
    upload.single('avatar'),
    ctrlWrapper(ctrl.updateAvatar), 
);

router.patch('/', authenticate, validateBody(schemas.changeSubscriptionSchema), ctrlWrapper(ctrl.changeSubscription));

module.exports = router;