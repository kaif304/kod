import { AppError } from "../utils/app-error.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const validate = (schema, target = "body") => (req, _res, next) => {
  const result = schema.safeParse(req[target]);

  if (!result.success) {
    return next(
      new AppError(
        "Validation failed",
        HTTP_STATUS.UNPROCESSABLE_ENTITY,
        result.error.flatten()
      )
    );
  }

  if (target === "query") {
    Object.assign(req.query, result.data);
  } else {
    req[target] = result.data;
  }

  next();
};


// import { AppError } from "../utils/app-error.js";
// import { HTTP_STATUS } from "../constants/httpStatus.js";

// export const validate = (schema, target = "body") => (req, _res, next) => {
//   const payload = req[target];
//   const result = schema.safeParse(payload);

//   if (!result.success) {
//     next(
//       new AppError("Validation failed", HTTP_STATUS.UNPROCESSABLE_ENTITY, result.error.flatten()),
//     );
//     return;
//   }

//   req[target] = result.data;
//   next();
// };
