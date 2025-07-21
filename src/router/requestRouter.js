const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;
    const validStatuses = ["ignored", "interested"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message:
          "Invalid status type. Valid statuses are 'ignore' or 'interested'.",
      });
    }
    // check user is not  present in the request
    const user = await User.findById(toUserId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Check if a connection request already exists
    const existingRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId }, // Check for reverse request
      ],
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Connection request already exists.",
      });
    }

    // } else if (status === "interested") {
    //   // Check if a connection request already exists in the opposite direction
    //   const reverseRequest = await ConnectionRequest.findOne({
    //     fromUserId: toUserId,
    //     toUserId: fromUserId,
    //   });
    //   if (reverseRequest) {
    //     return res.status(400).json({
    //       message:
    //         "Connection request already exists in the opposite direction.",
    //     });
    //   }
    // } else if (status === "ignore") {
    //   // If the status is 'ignore', we don't need to check for reverse requests
    //   return res.status(400).json({
    //     message: "Cannot send 'ignore' request.",
    //   });
    // }
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();
    let message;
    if (status === "interested") {
      message = "Interest sent successfully!";
    } else if (status === "ignored") {
      message = "User ignored successfully!";
    } else {
      message = "Connection request sent successfully";
    }
    res.json({
      data: data,
      message: message,
    });
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});
router.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      // validate the status
      // Jaishnav to Manju
      // Manju Is loggedin == toUserId
      // Status should be == intersted
      // Request id should be valid

      const requestId = req.params.requestId;
      const status = req.params.status;
      const validStatuses = ["accepted", "rejected"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          message:
            "Invalid status type. Valid statuses are 'accepted' or 'rejected'.",
        });
      }

      const connectionRequest = await ConnectionRequest.findById(requestId);
      if (!connectionRequest) {
        return res.status(404).json({
          message: "Connection request not found.",
        });
      }

      // Update the status of the connection request
      connectionRequest.status = status;
      const updatedRequest = await connectionRequest.save();

      res.json({
        data: updatedRequest,
        message: `Connection request ${status} successfully!`,
      });
    } catch (err) {
      res.status(400).send("Error:" + err.message);
    }
  }
);

module.exports = router;
