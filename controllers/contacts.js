const { HttpErrors } = require('../helpers/HttpErrors'); 
const CtrlWrapper = require('../helpers/CtrlWrapper')
const { Contact } = require('../models/contacts');
const {AddSchema, updateFavoriteSchema} = require('../middlewares/schema')

const listContacts = async (req, res, next) => {
    const result = await Contact.find();
    res.json(result);
    console.log(result);
};

const getById = async (req, res, next) => {
    const { id } = req.params; 
    const result = await Contact.findById(id);
    if (!result) {
    throw HttpErrors(404, 'Not found');
    }
    res.json(result); 
};

const addContact = async (req, res, next) => {
    const { error } = AddSchema.validate(req.body);
    if (error) {
        throw HttpErrors(400, 'Missing required name field');
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
};

const removeContact = async (req, res, next) => {
    console.log(req.params);
    const { id } = req.params; 

    const result = await Contact.findByIdAndDelete(id);

    if (!result) {
    throw HttpErrors(404, 'Not found'); 
    }
    res.json({
        message: 'Contact deleted',
    }); 
};

const updateById = async (req, res, next) => {
    const { error } = AddSchema.validate(req.body);
    if (error) {
        throw HttpErrors(400, 'missing fields');
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw HttpErrors(404, 'Not found');
    }
    res.json(result);
};

const updateStatusContact = async (req, res) => {
    const { error } = updateFavoriteSchema.validate(req.body);
    if (error) {
        throw HttpErrors(400, 'missing field favorite');
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw HttpErrors(404, 'Not found');
    }
    res.json(result);
};

module.exports = {
    listContacts: CtrlWrapper(listContacts),
    getById: CtrlWrapper(getById),
    addContact: CtrlWrapper(addContact),
    updateById: CtrlWrapper(updateById),
    updateStatusContact: CtrlWrapper(updateStatusContact),
    removeContact: CtrlWrapper(removeContact),
};