const express = require('express');

const {contacts: ctrl} = require("../../controllers");
const { joiSchema, updateFavoriteJoiSchema } = require('../../models/contact');
const { controllerWrapper, validation } = require("../../middlewares");

const router = express.Router();


router.get('/', controllerWrapper(ctrl.getAllContacts));

router.get('/:contactId', controllerWrapper(ctrl.getContactById));

router.post('/', validation(joiSchema), controllerWrapper(ctrl.addContact));

router.put('/:contactId', validation(joiSchema), controllerWrapper(ctrl.updateContactById));

router.patch('/:contactId',validation(updateFavoriteJoiSchema), controllerWrapper(ctrl.updateFavorite))

router.delete('/:contactId', validation(joiSchema), controllerWrapper(ctrl.removeContactById))



module.exports = router
