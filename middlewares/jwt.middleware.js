// External Modules
import jwt from "jsonwebtoken";

// Local Modules
import AppError from "../classes/AppError.class.js";

export const verifyTempAuthToken = (req, res, next) => {
  if (jwt.verify(req.cookies.TempAuthToken, process.env.JWT_SECRET)) {
    return next();
  }

  return next(
    new AppError({
      statusCode: 401,
      code: "JWT_VERIFICATION_FAILED",
      message: "Jwt Varification Failed.",
    }),
  );
};
