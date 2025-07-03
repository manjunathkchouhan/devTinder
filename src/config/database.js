const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namaste-node:PuHGedueAlFwz1UH@learn-nodejs.ypirzgl.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
