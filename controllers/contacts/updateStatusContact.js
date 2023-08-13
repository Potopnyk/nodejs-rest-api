const { Contact } = require('../../models/contacts'); 
const { HttpErorrs } = require('../../helpers'); 
const {updateFavoriteSchema} = require('../../middlewares/schema')

const updateStatusContact = async (req, res) => {
    const { error } = updateFavoriteSchema.validate(req.body);
    if (error) {
        throw HttpErorrs(400, 'missing field favorite');
    }

    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
    throw HttpErorrs(404, 'Not found'); 
    }

    res.json(result); 
};

module.exports = updateStatusContact; 