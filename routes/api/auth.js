const express = require('express')
const { ValidateBody, authenticate } = require('../../middlewares'); 
const { schemas } = require('../../middlewares/schema');

const router = express.Router();
const ctrl = require('../../controllers/auth');

const { ctrlWrapper } = require('../../helpers');

router.post('/register', ValidateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.post('/login', ValidateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));

router.post('/logout', authenticate, ctrlWrapper(ctrl.logout));

router.patch('/', authenticate, ValidateBody(schemas.changeSubscriptionSchema), ctrlWrapper(ctrl.changeSubscription));

module.exports = router;