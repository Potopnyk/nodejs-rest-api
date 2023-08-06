const { Contact } = require('../../models/contacts'); 
const { HttpErorrs } = require('../../helpers');
const { AddSchema } = require('../../middlewares/schema');


const addContact = async (req, res) => {
    const { error } = AddSchema.validate(req.body);

    if (error) {
        throw HttpErorrs(400, 'missing required name field');
    };

    const { _id: owner } = req.user; 
    const result = await Contact.create({ ...req.body, owner });

    res.status(201).json(result);
};

module.exports = addContact;