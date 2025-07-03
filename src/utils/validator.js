const validator = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email format");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
  // Validate each field
  //   if (!firstName || typeof firstName !== "string" || firstName.length < 4 || firstName.length > 50) {
  //     throw new Error("Invalid first name");
  //   }
  //   if (lastName && (typeof lastName !== "string" || lastName.length > 50)) {
  //     throw new Error("Invalid last name");
  //   }
  //   if (!emailId || typeof emailId !== "string" || !validator.isEmail(emailId)) {
  //     throw new Error("Invalid email format");
  //   }
  //   if (!password || typeof password !== "string" || !validator.isStrongPassword(password)) {
  //     throw new Error("Enter a strong password");
  //   }
  //   if (age && (typeof age !== "number" || age < 18)) {
  //     throw new Error("Invalid age");
  //   }
  //   if (gender && !["male", "female", "others"].includes(gender.toLowerCase())) {
  //     throw new Error("Invalid gender");
  //   }
  //   if (photoUrl && (typeof photoUrl !== "string" || !validator.isURL(photoUrl))) {
  //     throw new Error("Invalid photo URL");
  //   }
  //   if (about && typeof about !== "string") {
  //     throw new Error("Invalid about");
  //   }
  //   if (skills && !Array.isArray(skills)) {
  //     throw new Error("Invalid skills");
  //   }
};

module.exports = {
  validateSignUpData,
};
