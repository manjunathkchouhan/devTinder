const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        // if (!value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        //   throw new Error("Invalid email format");
        // }
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email format : " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password: " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value.toLowerCase())) {
          throw new Error("Invalid gender data");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://www.rapidlogistics.in/images/team/Dummy-Profile.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL  : " + value);
        }
      },
    },
    about: {
      type: String,
      default: "Hey there! I am using DevTinder",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DevTinderSecretKey", {
    expiresIn: "7d", // 7 days expiry
  });
  return token;
};
userSchema.methods.validatePassword = async function (userInputPassword) {
  const user = this;
  const passwordHash = user.password;
  const isValidated = await bcrypt.compare(userInputPassword, passwordHash);
  return isValidated;
};
module.exports = mongoose.model("User", userSchema);
