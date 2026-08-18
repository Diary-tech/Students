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
      message: 'Erreur lors de la récupération des étudiants',
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
        message: 'Étudiant introuvable'
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
      message: 'Erreur lors de la récupération de l’étudiant',
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
        message: 'Étudiant introuvable'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Étudiant mis à jour avec succès',
      data: student
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la modification de l’étudiant',
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
        message: 'Étudiant introuvable'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Étudiant supprimé avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de l’étudiant',
      error
    });
  }
};

const getAverageAge = async (req: Request, res: Response): Promise<void> => {
    try {
      const averageAge = await studentService.getAverageAge();
      res.status(200).json({ averageAge });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors du calcul de la moyenne d'âge." });
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