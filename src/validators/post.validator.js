// External Modules
import { check } from "express-validator";

export const checkCaption = [
  check("caption")
    .trim()
    .notEmpty()
    .withMessage("CAPTION_REQUIRED")
    .bail()
    .isLength({ min: 3, max: 1850 })
    .withMessage("CAPTION_INVALID_LENGTH")
    .bail(),
];
