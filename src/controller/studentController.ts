import type { Request, Response } from 'express';
import studentService from '../service/studentService.ts';

export const getAllStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await studentService.getAllStudents();
    res.status(200).json({
      success: true,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error while fetching students',
      error
    });
  }
};

export const getStudentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const studentId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const student = await studentService.getStudentById(studentId);

    if (!student) {
      res.status(404).json({
        success: false,
        message: 'Student not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error while fetching the student',
      error
    });
  }
};

export const createStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const newStudent = await studentService.createStudent(req.body);

    res.status(201).json({
      success: true,
      message: 'students created',
      data: newStudent
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error ',
      error
    });
  }
};

export const updateStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const studentId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const student = await studentService.updateStudent(studentId, req.body);

    if (!student) {
      res.status(404).json({
        success: false,
        message: 'Student not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error while updating the student',
      error
    });
  }
};

export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const studentId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const deleted = await studentService.deleteStudent(studentId);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: 'Student not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error while deleting the student',
      error
    });
  }
};

const getAverageAge = async (req: Request, res: Response): Promise<void> => {
    try {
      const averageAge = await studentService.getAverageAge();
      res.status(200).json({ averageAge });
    } catch (error) {
      res.status(500).json({ message: "Error while calculating the average age." });
    }
  }

export default {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getAverageAge
};