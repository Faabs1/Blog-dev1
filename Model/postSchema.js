const mongoose = require("mongoose");

const categories = ["Finance", "Travel", "Lifestyle", "Entertainment", "Food & Drink", "Science", "Environment", "Personal Finance"];

const PostSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        enum: categories, 
        required: true 
    },
    images: [{ 
        type: String   // Array to store up to 15 images
    }], 
    user: { 
        type: mongoose.Schema.Types.ObjectId, ref: "User" 
    },
}, { 
    timestamps: true 
});

module.exports = mongoose.model("Post", PostSchema);
