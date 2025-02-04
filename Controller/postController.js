const Post = require("../Model/postSchema");

exports.createPost = async (req, res) => {
    try {
        const { title, content, category } = req.body;

        // Upload images to Cloudinary
        const imageUrls = [];
        for (const file of req.files) {
            const result = await cloudinary.uploader.upload_stream(
                { folder: "blog_images" },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        return res.status(500).json({ error: "Image upload failed" });
                    }
                    imageUrls.push(result.secure_url);
                    if (imageUrls.length === req.files.length) {
                        savePost();
                    }
                }
            ).end(file.buffer);
        }

        function savePost() {
            const newPost = new Post({
                title,
                content,
                category,
                images: imageUrls,
                user: req.user.userId,
            });

            newPost.save()
                .then((savedPost) => res.status(201).json(savedPost))
                .catch((err) => res.status(500).json({ error: err.message }));
        }
    } catch (err) {
        return res.status(500).json({message:"Internal server error" });
    }
};

exports.getPostsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const posts = await Post.find({ category }).populate("user", "username");
        return res.json(posts);
    } catch (err) {
        return res.status(500).json({message:'Invalid category'});
    }
};
