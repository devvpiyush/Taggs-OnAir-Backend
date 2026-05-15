// External Modules
import jwt from "jsonwebtoken";

// Local Modules
import AppError from "../classes/AppError.class.js";

function requireAuth(req, res, next) {
  if (!req.cookies?.token) {
    return next(new AppError("You cannot do this.", "UNAUTHORIZED", 401));
  }

  try {
    jwt.verify(req.cookies?.token, process.env.JWT_SECRET);
    return next();
  } catch {
    return next(new AppError("You cannot do this.", "UNAUTHORIZED", 401));
  }
}

function notRequireAuth(req, res, next) {
  if (!req.cookies?.token) return next();

  try {
    jwt.verify(req.cookies?.token, process.env.JWT_SECRET);
    return next(new AppError("You cannot do this.", "UNAUTHORIZED", 401));
  } catch {
    return next();
  }
}

export default { requireAuth, notRequireAuth };
