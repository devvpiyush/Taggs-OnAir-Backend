// External Modules
import cookie from "cookie";
import jwt from "jsonwebtoken";

const AuthMiddleware = (socket, next) => {
  if (!socket.handshake.headers.cookie) return socket.disconnect();

  const AuthCookie = cookie.parse(socket.handshake.headers.cookie);

  if (!AuthCookie) return socket.disconnect();

  const decoded = jwt.verify(AuthCookie.token, process.env.JWT_SECRET);

  socket.userId = decoded._id;

  next();
};

export default AuthMiddleware;
