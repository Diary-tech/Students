import {type Request,type Response,type NextFunction } from "express";  
import jwt, {type JwtPayload} from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET must be defined in environment variables");
}

export interface AuthPayload extends JwtPayload {
  id: string;
}

export interface AuthRequest extends Request {
  user?: AuthPayload; 
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: 'Token missing or invalid' });
  }
  const token = authHeader && authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
    req.user = decoded;
    next(); 
  } catch (error) {
    return res.status(403).json({ message: 'Token expired or invalid' });
  }
}