// External Modules
import { validationResult } from "express-validator";

function handleValidate(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      isSuccess: false,
      signal: "BLUE",
      code: errors.array()[0].msg,
      message: "Validation Failed!",
      meta: { field: errors.array()[0].path, value: errors.array()[0].value },
    });
  }

  next();
}

export default handleValidate;
