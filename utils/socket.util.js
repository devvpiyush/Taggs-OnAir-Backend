// External Modules
import { Server } from "socket.io";

// Local Modules
import { heartBeat } from "./events.util.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const initSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: process.env.CLIENT_URL, credentials: true },
  });

  // Middlewares
  io.use(AuthMiddleware);

  io.on("connection", (socket) => {
    try {
      // Events
      heartBeat(socket);
    } catch {
      socket.disconnect();
    }
  });
};

export default initSocket;
