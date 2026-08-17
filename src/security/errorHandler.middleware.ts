import { type Request,type Response,type NextFunction } from "express";

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isProd = process.env.NODE_ENV === "production";

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Erreur non prévue : log complet côté serveur, message générique côté client
  console.error(err);

  return res.status(500).json({
    message: "Internal server error",
    ...(isProd ? {} : { detail: err.message, stack: err.stack }),
  });
};