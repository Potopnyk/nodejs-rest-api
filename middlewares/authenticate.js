const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

require('dotenv').config();
const { SECRET_KEY } = process.env;

const { HttpErorrs } = require('../helpers'); 
const CtrlWrapper = require('../helpers/CtrlWrapper');

const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
        throw HttpErorrs(401, 'Not authorized');
    }
try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user) {
        throw HttpErorrs(401, 'Not authorized');
    }
    next();
    } catch {
    next(HttpErorrs(401, 'Not authorized'));
    }
};

module.exports = CtrlWrapper(authenticate); 
