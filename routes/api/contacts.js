const express = require('express');
const Ctrl = require('../../controllers/contacts');
const  isValidId  = require('../../middlewares');

const router = express.Router()



router.get('/', Ctrl.listContacts);
router.get('/:id', Ctrl.getById);
router.post('/', Ctrl.addContact);
router.put('/:id', Ctrl.updateById);
router.patch('/:id/favorite', isValidId, Ctrl.updateStatusContact);
router.delete('/:id', Ctrl.removeContact);


module.exports = router;