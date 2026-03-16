// External Modules
import jwt from "jsonwebtoken";

// Local Modules
import AppError from "../classes/AppError.class.js";

export function requireAuth(req, res, next) {
  if (!req.cookies?.AuthToken) {
    return next(new AppError("You cannot do this.", "UNAUTHORIZED", 401));
  }

  try {
    jwt.verify(req.cookies?.AuthToken, process.env.JWT_SECRET);
    return next();
  } catch {
    return next(new AppError("You cannot do this.", "UNAUTHORIZED", 401));
  }
}

export function notRequireAuth(req, res, next) {
  if (!req.cookies?.AuthToken) return next();

  try {
    jwt.verify(req.cookies?.AuthToken, process.env.JWT_SECRET);
    return next(new AppError("You cannot do this.", "UNAUTHORIZED", 401));
  } catch {
    return next();
  }
}
