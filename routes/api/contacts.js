const express = require('express'); 
const router = express.Router(); 

const ctrl = require('../../controllers/contacts'); 

const { isValidId, authenticate, ValidateBody, upload } = require('../../middlewares'); 
const { schemas } = require('../../middlewares/schema');

router.get('/', authenticate, ctrl.listContacts);

router.get('/:id', authenticate, isValidId, ctrl.getById);

router.post('/', authenticate, upload.single("avatar"), ValidateBody(schemas.AddSchema), ctrl.addContact);

router.put('/:id', authenticate, isValidId, ValidateBody(schemas.AddSchema), ctrl.updateById);

router.patch('/:id/favorite', authenticate, isValidId, ValidateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact);

router.delete('/:id', authenticate, isValidId, ctrl.removeContact);

module.exports = router