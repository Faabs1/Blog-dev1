const express = require("express");
const DB = require("./Database/db");
const env = require("dotenv").config();
const userRoutes = require("./Routes/userRouter");
const postRoutes = require("./Routes/postRouter");
const adminRoutes = require("./Routes/adminRouter");
const userMiddleware = require("./Middleware/jwt");
const https = require('https');


const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));

DB();

app.use("/api/user", userRoutes);
app.use("/api/posts", userMiddleware, postRoutes);
app.use("/api/admin", userMiddleware, adminRoutes);

const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`server is running at https://localhost:${port}`));
