const { Contact, addSchema } = require('../../models/contacts');
const { HttpErorrs } = require('../../helpers'); 

const updateById = async (req, res) => {
    const { error } = addSchema.validate(req.body);
    if (error) {
        throw HttpErorrs(400, 'missing fields');
    }

    const { id } = req.params; 
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
        throw HttpErorrs(404, 'Not found'); 
    }

    res.json(result);
    };

module.exports = updateById; 