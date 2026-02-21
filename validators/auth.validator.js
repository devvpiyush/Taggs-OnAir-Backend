// External Modules
import { check } from "express-validator";

// Local Modules
import { RESERVED_USERNAMES } from "../data/Reserves";
import { USERNAME_PROFANITES } from "../data/Profanites";

export const UsernameValidator = () => {
  check("username")
    .exists()
    .withMessage("USERNAME_REQUIRED")
    .bail()
    .trim()
    .toLowerCase()
    .isLength({ min: 3, max: 21 })
    .withMessage("USERNAME_INVALID_LENGTH")
    .bail()
    .not()
    .matches(/^[a-z0-9._]+$/)
    .withMessage("USERNAME_INVALID_CHARACTERS")
    .custom((value) => {
      if (value.startsWith(".") || value.endsWith(".")) {
        throw new Error("USERNAME_INVALID_DOT_POSITION");
      }
      return true;
    })
    .custom((value) => {
      if (value.includes("..")) {
        throw new Error("USERNAME_CONTAINS_CONSECUTIVE_DOTS");
      }
      return true;
    })
    .custom((value) => {
      if (/^\d+$/.test(value)) {
        throw new Error("USERNAME_NUMERIC_ONLY");
      }
      return true;
    })
    .custom((value) => {
      let normalized = value.replace(".", "");
      normalized.replace("_", "");
      if (
        RESERVED_USERNAMES.includes(normalized) ||
        USERNAME_PROFANITES.includes(normalized)
      ) {
        throw new Error("USERNAME_NOT_ALLOWED");
      }
      return true;
    });
};
