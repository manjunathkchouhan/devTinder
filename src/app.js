const express = require("express");
const app = express();

app.use(
  "/user",
  (req, res) => {
    console.log("User endpoint hit");
    res.send("User endpoint response");
  },
  (req, res) => {
    console.log("User endpoint hit 1");
    res.send("User endpoint response 1");
  }
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
