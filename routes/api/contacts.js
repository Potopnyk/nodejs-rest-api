const express = require('express');
const ctrl = require('../../controllers/contacts');
const { validateBody } = require('../../middlewares');
const AddSchema = require('../../middlewares/schema')

const router = express.Router()



router.get('/', ctrl.getAll);
router.get('/:contactId', ctrl.getById);
router.post('/', validateBody(AddSchema), ctrl.addContact);
router.delete('/:contactId', validateBody(AddSchema), ctrl.deleteContact);
router.put('/:contactId', validateBody(AddSchema), ctrl.updateContact);

module.exports = router;