// External Modules
import jwt from "jsonwebtoken";

export const generateToken = (_id, expiry = null) => {
  return jwt.sign(
    { _id },
    process.env.JWT_SECRET,
    expiry !== null && { expiresIn: `${expiry}m` },
  );
};
