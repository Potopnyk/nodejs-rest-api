const { Contact } = require('../../models/contacts'); 
const { HttpErorrs } = require('../../helpers'); 

const getById = async (req, res) => {
    const { id } = req.params; 
    const result = await Contact.findById(id); 

    if (!result) {
        throw HttpErorrs(404, 'Not found');
    }

    res.json(result);
};

module.exports = getById; 