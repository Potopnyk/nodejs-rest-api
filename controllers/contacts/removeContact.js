const { Contact } = require('../../models/contacts'); 
const { HttpErorrs } = require('../../helpers'); 
const removeContact = async (req, res) => {
    const { id } = req.params; 
    const result = await Contact.findByIdAndDelete(id);

    if (!result) {
        throw HttpErorrs(404, 'Not found');
    }

    res.json({
    message: 'contact deleted',
    });
    };

module.exports = removeContact; 