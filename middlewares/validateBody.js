const { HttpErorrs } = require('../helpers'); 

function ValidateBody(schema) { 
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            throw next(HttpErorrs(400, error.message));
        };
        next();
    };
    return func;
};

module.exports = ValidateBody;