// Local Modules
import userModel from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.util.js";

export const heartBeat = (socket) => {
  socket.on(
    "heartbeat",
    asyncHandler(async (data, callback) => {
      await userModel.findByIdAndUpdate(socket.userId, {
        lastActiveAt: Date.now(),
      });

      if (callback) callback({ status: "ok" });
    }),
  );
};
