import {type Request,type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import studentRepository from "../repositories/studentRepository.ts";
const JWT_SECRET = process.env.JWT_SECRET!;

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const user = await studentRepository.findByEmail(email);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

  return res.status(200).json({ token });
};