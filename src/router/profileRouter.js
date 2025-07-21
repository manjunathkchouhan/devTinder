const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validator");
router.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

router.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Profile Data");
    }
    const loggedInUser = req.user;
    // Proceed with updating the user profile
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.send({
      message: `${loggedInUser.firstName} your profile updated sccussfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = router;
