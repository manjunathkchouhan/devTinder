const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  { timestamps: true }
);

// Creating index
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  // Ensure that fromUserId and toUserId are not the same
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    return next(new Error("Cannot send a connection request to yourself."));
  }
  next();
});

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);
module.exports = ConnectionRequestModel;
