const Post = require("../Model/postSchema");
const cloudinary = require("../utils/cloudinary");

exports.createPost = async (req, res) => {
    try {
        const { title, content, category, images } = req.body;

        // Upload images to Cloudinary
        const imageUrls = [];
        for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        imageUrls.push(result.secure_url);
        }
        
        const newPost = new Post({
            title,
            content,
            category,
            images: imageUrls
        })
        await newPost.save();

        return res.status(200).json({message: "Post created Successfully"});
        
    } catch (err) {
        console.log(err);
        
        return res.status(500).json({message:'Server Error'});
    }
}
           
exports.getPostsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const posts = await Post.find({ category }).populate("user", "username");
        return res.json(posts);
    } catch (err) {
        return res.status(500).json({message:'Invalid category'});
    }
};
