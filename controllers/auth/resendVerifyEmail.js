const { User } = require('../../models/user'); 
const { HttpErorrs, sendEmail } = require('../../helpers'); 
require('dotenv').config(); 
const { BASE_URL } = process.env; 

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpErorrs(401, 'User not found');
    }

    if (user.verify) {
        throw HttpErorrs(400, 'Verification has already been passed');
    }

    const verifyEmail = {
        to: email,
        subject: 'Verify email',
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to verify email</a>`,
    };

    await sendEmail(verifyEmail);
    res.json({
        message: 'Verification email sent',
    });
};

module.exports = resendVerifyEmail;