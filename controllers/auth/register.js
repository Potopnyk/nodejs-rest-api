const bcryptjs = require('bcryptjs');
const { User } = require('../../models/user');
const { HttpErorrs } = require('../../helpers');

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpErorrs(409 < 'Email in use');
    }
    
    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
    });
};

module.exports = register;

