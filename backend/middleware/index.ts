import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export class AppError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = "AppError";
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.message) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(5),
});

export const validatePagination = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = paginationSchema.parse(req.query);
    req.query.page = String(result.page);
    req.query.limit = String(result.limit);
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw new AppError(400, err.issues[0].message);
    }
    throw err;
  }
};

export { validateSuperhero } from "./validator";
