const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Model/userSchema");
const cloudinary = require('../utils/cloudinary');
const nodemailer = require('nodemailer');
exports.register = async (req, res) => {
    try {
        const { username, email, password, confirmpassword, isAdmin, profilePic } = req.body;
         
        if(password!==confirmpassword){
            return res.status(400).json({ msg: 'Passwords do not match' });
        }

        const existingUser = await User.findOne({ email})

            if (existingUser) {
            return res.status(400).json({ msg: 'Email already exists' });  
            }
    
            console.log(req.file);
            
            const hashPassword =await bcrypt.hash(password, 10)  //10 is the Saltround for the hashing
            //i.e the number of rounds that the password can be hashed and the standard is 10-12,

            const result = await cloudinary.uploader.upload(req.file.path);

            console.log(result);

        const hashedPassword = await bcrypt.hash(password, 10);
       

        const newUser = new User({ 
            username, 
            email, 
            password: hashedPassword, 
            isAdmin 
        });
        await newUser.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL,
                pass: process.env.MAIL_PASS,
            },
        });

        // Define the Email options
        const mailOptions = {
            from: process.env.MAIL,
            to: `${newUser.email}`,
            subject: 'Hello from Blog dev',
            text: `Welcome ${newUser.username} to our platform`,
        };

        // Send the mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occured: ' , error);

                //write a function to send a scheduled message (every 5 min)
                // Use Cron to schedule
            } else {
                console.log("Email sent:", info.response);
            }
        });

                 //respond with a success message
        return res.status(200).json({message: "User registered successfully and you will recieve a mail", newUser});
            } catch (error) {
                console.log(error);
                
        return res.status(500).json({message:"internal server error"})
        
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
       
        const user = await User.findOne({ email });
        
        if (!user || !user.isActive) {
            return res.status(400).json({ error: "User not found or disabled" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const payload = {
            id: user.id,
            password: user.password,
            isAdmin: user.isAdmin
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
       return res.json({ token });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
};
