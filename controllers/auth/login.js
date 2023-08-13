const bcryptjs = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const { User } = require('../../models/user'); 
const { HttpErorrs } = require('../../helpers'); 
const { SECRET_KEY } = process.env; 

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpErorrs(401, 'Email or password is wrong');
    }

    if (!user.verify) {
        throw HttpErorrs(401, 'Email not verified');
    }
    
    const passwordCompare = await bcryptjs.compare(password, user.password);

    if (!passwordCompare) {
    throw HttpErorrs(401, 'Email or password is wrong');
    };

    const payload = {
        id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
    await User.findByIdAndUpdate(user._id, { token }); 

    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        }
        }); 
};

module.exports = login; 