// const multer = require("multer");
// const CloudinaryStorage  = require("multer-storage-cloudinary");
// const cloudinary = require("../utils/cloudinary");

// const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: "blog_images", // Cloudinary folder name
//         allowed_formats: ["jpg", "png", "jpeg"],
//     },
// });

// const upload = multer({ storage });

// module.exports = upload;


// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     },
//     fileFilter: (req, file, cb) => {
//         let ext = path.extname(file.originalname).toLowerCase();
//         if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
//             cb(new Error('File type is not supported'), false);
//             return;
//         }
//         cb(null, true);
//         },
// });

// const upload = multer({ storage });

// module.exports = upload;


const multer = require('multer');
const path = require('path');


module.exports = multer({
storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname).toLowerCase();
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            cb(new Error('File type is not supported'), false);
            return;
        }
        cb(null, true);
        },
});	



