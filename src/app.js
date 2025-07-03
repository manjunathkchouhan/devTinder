const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validator");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userAuth = require("./middlewares/auth");
// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // Validate the signup data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    // Handle user signup logic here
    // creating new instance of the user model
    // Encrypt the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });
    // Save the user to the database

    await user.save();
    res.send("User signed up successfully");
  } catch (error) {
    // console.error("Error signing up user:", error);
    res.status(400).send("Error :" + error.message);
  }
});
// Login Api

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    // Validate the login data
    if (!emailId || !password) {
      throw new Error("Invalid credentials");
    }
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid credentials");
    }

    // Find the user by email
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    // Check if the password is correct
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    // Create a JWT token
    const token = await user.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000), // 8 hours expiry
    });
    res.send("Login successful");
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});
app.post("/connectionrequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " has sent a connection request");
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

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
