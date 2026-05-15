// External Modules
import bcrypt from "bcrypt";

// Local Modules
import UserModel from "../models/user.model.js";

export const findUser = async (usernameOrEmail) => {
  try {
    const User = await UserModel.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    })
      .select("+password")
      .lean();

    if (!User) {
      return { flag: "RED", code: "USER_NOT_FOUND" };
    } else {
      return User;
    }
  } catch (err) {
    return err;
  }
};

export const verifyPassword = async (password, encryptedPassword) => {
  const result = await bcrypt.compare(password, encryptedPassword);

  if (!result) {
    return { flag: "RED", code: "INCORRECT_PASSWORD" };
  } else {
    return true;
  }
};
