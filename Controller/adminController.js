const User = require("../Model/userSchema");
const Post = require("../Model/postSchema");
exports.disableUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { isActive: false });
        return res.json({ message: "User disabled" });
    } catch (err) {
        return res.status(500).json({message:"Internal server Error" });
    }
};
