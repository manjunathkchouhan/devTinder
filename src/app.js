const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

const authRouter = require("./router/authRouter");
const requestRouter = require("./router/requestRouter");
const profileRouter = require("./router/profileRouter");

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", requestRouter);
app.use("/", profileRouter);

connectDB()
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
