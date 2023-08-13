const { User } = require("../../models/user");
const { HttpErorrs } = require("../../helpers");

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
        throw HttpErorrs(401, 'User not found')
    }

    await User.findByIdAndUpdate(user._id, {
        verify: true,
        verificationToken: "",
    });

    res.json({
        message: "Verification successful",
    });
};

module.exports = verifyEmail;